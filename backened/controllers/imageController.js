const Crop = require('../models/Crop');
const Query = require('../models/Query');

// Analyze uploaded image
exports.analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No image uploaded' 
      });
    }

    // Check file size
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        error: 'Image too large. Maximum size is 5MB'
      });
    }

    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');
    
    // Here you would integrate with your AI model
    // Options:
    // 1. TensorFlow.js model
    // 2. External API (Google Vision, Plant.id, etc.)
    // 3. Custom Python ML model via API
    
    // For now, return mock analysis
    const analysisResults = {
      disease: 'Tomato Leaf Blight',
      confidence: 87,
      recommendations: [
        'Apply copper-based fungicide',
        'Remove affected leaves',
        'Improve air circulation',
        'Avoid overhead watering'
      ],
      severity: 'Moderate',
      treatment: 'Fungicide application needed',
      preventiveMeasures: [
        'Rotate crops yearly',
        'Use disease-resistant varieties',
        'Water at soil level'
      ]
    };

    // Store in session or temp storage for saving
    req.session.tempAnalysis = {
      results: analysisResults,
      image: imageBase64,
      timestamp: new Date()
    };

    res.json({
      success: true,
      message: 'Image analyzed successfully',
      data: analysisResults
    });

  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Image analysis failed',
      details: error.message 
    });
  }
};

// Save analysis to database
exports.saveAnalysis = async (req, res) => {
  try {
    const { cropName, location, notes } = req.body;
    const userId = req.user.id;
    
    if (!req.session.tempAnalysis) {
      return res.status(400).json({
        success: false,
        error: 'No analysis to save'
      });
    }

    // Create new crop record with analysis
    const newCrop = new Crop({
      userId,
      name: cropName || 'Unknown Crop',
      type: 'Vegetable', // You can detect this from image
      location: location || 'Farm',
      plantingDate: new Date(),
      healthStatus: req.session.tempAnalysis.results.severity,
      image: req.session.tempAnalysis.image,
      analysis: req.session.tempAnalysis.results,
      notes: notes || ''
    });

    await newCrop.save();

    // Also save as a query for history
    const newQuery = new Query({
      userId,
      type: 'image_analysis',
      input: 'Image upload',
      response: JSON.stringify(req.session.tempAnalysis.results),
      cropId: newCrop._id
    });

    await newQuery.save();

    // Clear temp analysis
    delete req.session.tempAnalysis;

    res.json({
      success: true,
      message: 'Analysis saved successfully',
      data: {
        cropId: newCrop._id,
        queryId: newQuery._id
      }
    });

  } catch (error) {
    console.error('Save analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save analysis'
    });
  }
};

// Get user's analysis history
exports.getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const queries = await Query.find({ userId, type: 'image_analysis' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('cropId', 'name location plantingDate healthStatus');

    const total = await Query.countDocuments({ userId, type: 'image_analysis' });

    res.json({
      success: true,
      data: queries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch history'
    });
  }
};