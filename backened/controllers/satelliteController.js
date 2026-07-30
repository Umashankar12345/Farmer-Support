const Field = require('../models/Field');

exports.getNdviData = async (req, res) => {
  try {
    const userId = req.params.farmId; // Treat farmId as userId for this prototype
    
    // Fetch user fields from database
    const fields = await Field.find({ userId: userId });
    
    // Fallback if no fields are found, to ensure the UI renders
    const activeFields = fields.length > 0 ? fields : [
      { fieldName: "North Sector Plot 1", cropName: "Wheat", areaHectares: 2.5, location: "North" },
      { fieldName: "East Field - Block B", cropName: "Mustard", areaHectares: 1.8, location: "East" }
    ];

    // Procedural generation logic for NDVI scores and grids
    const allFields = activeFields.map((field, index) => {
      // Simulate an NDVI score based on crop and some randomness
      // Most fields will be healthy (0.7+), some might struggle
      const baseNdvi = index === 0 ? 0.82 : 0.45 + (Math.random() * 0.3);
      
      return {
        id: field._id || `temp_${index}`,
        name: field.fieldName,
        crop: field.cropName,
        zone: field.location || "North",
        areaHa: field.areaHectares,
        ndvi: Number(baseNdvi.toFixed(2))
      };
    });

    const primaryField = allFields[0];

    // Generate a spatial grid of 24 cells (6x4) for the active field
    const gridCells = Array.from({ length: 24 }).map((_, i) => {
      const rand = Math.random();
      let status = "healthy";
      let label = "";

      if (primaryField.ndvi < 0.6) {
        if (rand > 0.6) status = "stress";
        else if (rand > 0.3) status = "warning";
      } else {
        if (rand > 0.85) status = "warning";
        else if (rand > 0.95) status = "dry";
      }

      // Add a label to a few random cells to match the UI screenshot
      if (rand < 0.1 && status === "healthy") label = "0.8";
      if (rand < 0.1 && status === "stress") label = "0.3";

      return { status, label };
    });

    const activeField = {
      name: primaryField.name,
      crop: primaryField.crop,
      zone: primaryField.zone,
      score: primaryField.ndvi,
      gridCells: gridCells,
      areaHa: primaryField.areaHa,
      alert: primaryField.ndvi < 0.5 ? "Severe water stress detected in NW quadrant. Recommend immediate irrigation." : null
    };

    // Generate advisories based on field scores
    const advisories = [];
    allFields.forEach(field => {
      if (field.ndvi < 0.5) {
        advisories.push({
          level: "severe",
          fieldName: field.name,
          ndvi: field.ndvi,
          message: "Critical biomass drop. Check for pest infestation or severe drought stress immediately."
        });
      } else if (field.ndvi < 0.7) {
        advisories.push({
          level: "moderate",
          fieldName: field.name,
          ndvi: field.ndvi,
          message: "Uneven vegetation detected. Consider variable rate nitrogen application."
        });
      } else {
        advisories.push({
          level: "healthy",
          fieldName: field.name,
          ndvi: field.ndvi,
          message: "Optimal crop health observed. Maintain current irrigation schedule."
        });
      }
    });

    return res.status(200).json({
      activeField,
      allFields,
      advisories
    });
  } catch (error) {
    console.error("[satelliteController] Error:", error);
    res.status(500).json({ error: "Failed to generate NDVI satellite data" });
  }
};
