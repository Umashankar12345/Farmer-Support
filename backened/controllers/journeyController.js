const Field = require('../models/Field');

exports.setupFirstField = async (req, res) => {
  try {
    const { state, fieldName, areaAcres, soilType, irrigation } = req.body;

    // Strict backend validation to eliminate blank or corrupted records
    if (!fieldName || !areaAcres || !soilType || !irrigation) {
      return res.status(400).json({
        success: false,
        message: "Missing required field parameters.",
      });
    }

    // Since this is a prototype and we might not have authentication fully wired
    // we use a dummy userId for now, or you could extract from req.user
    const dummyUserId = "64c8d9f1e4b0a1a2b3c4d5e6"; // Valid ObjectId format

    // Convert Acres to Hectares (1 Acre = 0.404686 Hectares)
    const areaHectares = Number(areaAcres) * 0.404686;

    // Construct valid field metadata record mapping to the Field schema
    const newFieldData = {
      userId: dummyUserId,
      fieldName: fieldName.trim(),
      cropName: "Wheat", // Defaulting to Wheat, or you can update the form to ask for it
      areaHectares: areaHectares,
      soilType: soilType,
      irrigationType: irrigation === "Borewell / Sprinkler" ? "Sprinkler" : irrigation, 
      location: state || "Bihar",
      sowingDate: new Date(), // Set to today by default
    };

    // Save newField to Database (MongoDB)
    // Commented out the actual save to prevent crashing if the dummy ObjectId causes issues
    // without a real User existing, but for a complete integration, we save it.
    // In Mongoose, if the ref doesn't strictly enforce foreign keys, this will save.
    const savedField = await Field.create(newFieldData);

    return res.status(201).json({
      success: true,
      message: "Field onboarding metadata registered successfully.",
      field: savedField,
    });
  } catch (error) {
    console.error("[journeyController] Setup field error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during field setup.",
    });
  }
};
