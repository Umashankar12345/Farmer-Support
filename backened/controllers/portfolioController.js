// backend/controllers/portfolioController.js

const Field = require('../models/Field');

const getCropStage = (sowingDate) => {
  if (!sowingDate) return "Unknown Stage";
  const days = Math.floor((Date.now() - new Date(sowingDate).getTime()) / (1000 * 60 * 60 * 24));
  if (days < 0) return "Not Sown Yet";
  if (days < 20) return `Seedling Stage (Day ${days})`;
  if (days < 50) return `Vegetative Stage (Day ${days})`;
  if (days < 80) return `Flowering Stage (Day ${days})`;
  if (days < 110) return `Maturation Stage (Day ${days})`;
  return `Harvest Ready (Day ${days})`;
};

exports.getFarmerPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;
    const fields = await Field.find({ userId }).sort({ createdAt: -1 });

    const mapSoilLevelToNumber = (level) => {
      switch (level) {
        case 'High': return 80;
        case 'Medium': return 50;
        case 'Low': return 30;
        default: return 50;
      }
    };

    const farms = fields.map(field => {
      return {
        id: field._id.toString(),
        name: field.fieldName,
        location: field.location || 'Unknown Location',
        areaAcres: (field.areaHectares * 2.47105).toFixed(1),
        currentCrop: field.cropName,
        cropStage: getCropStage(field.sowingDate),
        lastTested: field.lastSoilTestDate ? field.lastSoilTestDate.toISOString().split('T')[0] : 'Not Tested',
        soilMetrics: {
          N: mapSoilLevelToNumber(field.lastSoilTestResults?.nitrogen),
          P: mapSoilLevelToNumber(field.lastSoilTestResults?.phosphorus),
          K: mapSoilLevelToNumber(field.lastSoilTestResults?.potassium),
          ph: field.lastSoilTestResults?.pH || 7.0
        },
        actionLogs: field.actionLogs || []
      };
    });

    let soilTrends = [
      { month: "Jan", N: 40, P: 25, K: 30, targetN: 60, targetP: 30, targetK: 40, ph: 6.2, targetPh: 6.5, moisture: 30, targetMoisture: 40 },
      { month: "Feb", N: 52, P: 28, K: 32, targetN: 60, targetP: 30, targetK: 40, ph: 6.4, targetPh: 6.5, moisture: 35, targetMoisture: 40 },
      { month: "Mar", N: 60, P: 35, K: 38, targetN: 60, targetP: 30, targetK: 40, ph: 6.5, targetPh: 6.5, moisture: 45, targetMoisture: 40 },
      { month: "Apr", N: 70, P: 40, K: 36, targetN: 60, targetP: 30, targetK: 40, ph: 6.6, targetPh: 6.5, moisture: 38, targetMoisture: 40 },
      { month: "May", N: 65, P: 38, K: 35, targetN: 60, targetP: 30, targetK: 40, ph: 6.7, targetPh: 6.5, moisture: 32, targetMoisture: 40 },
      { month: "Jun", N: 75, P: 42, K: 40, targetN: 60, targetP: 30, targetK: 40, ph: 6.8, targetPh: 6.5, moisture: 40, targetMoisture: 40 }
    ];

    const actionableTasks = [];
    fields.forEach((field, index) => {
      // Merge DB tasks
      if (field.tasks) {
        field.tasks.forEach(t => {
          if (t.status === 'pending') {
            actionableTasks.push({
              id: t._id.toString(),
              fieldId: field._id.toString(),
              type: t.type,
              priority: t.priority,
              message: t.message
            });
          }
        });
      }
      
      // Auto-generate if empty for demo
      if (!field.lastSoilTestDate && (!field.tasks || field.tasks.length === 0)) {
        actionableTasks.push({
          id: `demo_${index}_1`,
          fieldId: field._id.toString(),
          type: "Soil Test",
          priority: "High",
          message: `No recent soil test found for ${field.fieldName}. Please test soil.`
        });
      }
    });

    const portfolioData = {
      activeFieldsCount: fields.length,
      farms: farms,
      soilTrends: soilTrends,
      actionableTasks: actionableTasks
    };

    return res.status(200).json(portfolioData);
  } catch (err) {
    console.error("[portfolioController] Error:", err);
    return res.status(500).json({ error: "Failed to fetch portfolio data." });
  }
};

exports.logAction = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const { type, description } = req.body;
    
    const field = await Field.findOne({ _id: fieldId, userId: req.user.id });
    if (!field) return res.status(404).json({ error: "Field not found" });

    field.actionLogs.push({ type, description });
    await field.save();

    res.status(200).json({ message: "Action logged successfully", log: field.actionLogs[field.actionLogs.length - 1] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log action" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { fieldId, taskId } = req.params;
    const { status } = req.body; // 'done' or 'snoozed'

    const field = await Field.findOne({ _id: fieldId, userId: req.user.id });
    if (!field) return res.status(404).json({ error: "Field not found" });

    const task = field.tasks.id(taskId);
    if (task) {
      task.status = status;
      await field.save();
    }
    
    res.status(200).json({ message: `Task marked as ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
};
