require("dotenv").config();
const mongoose  = require("mongoose");
const PestAlert = require("../models/PestAlert");

const alerts = [
  // ── PUNJAB ──
  { pestName:"Army Worm",        region:"Punjab",         severity:"high",   affectedCrops:["Maize","Wheat"],      treatment:"Spray Chlorpyriphos 2.5% @ 1.5L/acre",        organicTreatment:"Neem oil spray 5ml/L",        description:"Larvae eat leaves at night. Check fields at dawn." },
  { pestName:"Whitefly",         region:"Punjab",         severity:"medium", affectedCrops:["Cotton","Soybean"],   treatment:"Imidacloprid 17.8% SL @ 150ml/acre",          organicTreatment:"Yellow sticky traps",          description:"Causes leaf curl and spreads virus in cotton." },
  { pestName:"Aphids",           region:"Punjab",         severity:"low",    affectedCrops:["Wheat","Mustard"],    treatment:"Dimethoate 30% EC @ 250ml/acre",               organicTreatment:"Neem oil + garlic spray",      description:"Sucks sap from young leaves. Monitor weekly." },

  // ── HARYANA ──
  { pestName:"Pink Bollworm",    region:"Haryana",        severity:"high",   affectedCrops:["Cotton"],             treatment:"Emamectin Benzoate 5% @ 80g/acre",            organicTreatment:"Pheromone traps",              description:"Bores into cotton bolls. Destroys yield severely." },
  { pestName:"Stem Borer",       region:"Haryana",        severity:"medium", affectedCrops:["Wheat","Maize"],      treatment:"Carbofuran 3G @ 6kg/acre",                    organicTreatment:"Trichogramma cards",           description:"Dead heart symptom in young plants." },
  { pestName:"Yellow Rust",      region:"Haryana",        severity:"medium", affectedCrops:["Wheat"],              treatment:"Propiconazole 25% EC @ 200ml/acre",           organicTreatment:"Sulfur dust",                  description:"Yellow stripes on leaves. Spreads fast in cool weather." },

  // ── RAJASTHAN ──
  { pestName:"Desert Locust",    region:"Rajasthan",      severity:"high",   affectedCrops:["Bajra","Jowar","Groundnut","Mustard"], treatment:"Contact Agriculture Office immediately. Malathion spray.", organicTreatment:"Report to block office", description:"Swarms can destroy entire fields within hours." },
  { pestName:"Cutworm",          region:"Rajasthan",      severity:"medium", affectedCrops:["Groundnut","Bajra"],  treatment:"Chlorpyriphos 20% EC soil drench",            organicTreatment:"Deep ploughing before sowing", description:"Cuts stems at ground level at night." },
  { pestName:"Powdery Mildew",   region:"Rajasthan",      severity:"low",    affectedCrops:["Mustard","Cumin"],    treatment:"Wettable Sulfur 80% @ 500g/acre",             organicTreatment:"Baking soda spray 5g/L",       description:"White powder on leaves. Common in dry weather." },

  // ── UTTAR PRADESH ──
  { pestName:"Brown Plant Hopper",region:"Uttar Pradesh", severity:"high",   affectedCrops:["Rice","Paddy"],       treatment:"Buprofezin 25% SC @ 400ml/acre",              organicTreatment:"Light traps at night",         description:"Hopper burn — plants dry suddenly in patches." },
  { pestName:"Leaf Folder",      region:"Uttar Pradesh",  severity:"medium", affectedCrops:["Rice","Paddy"],       treatment:"Lambda Cyhalothrin 5% EC @ 200ml/acre",       organicTreatment:"Release Trichogramma wasps",   description:"Folds leaves longitudinally and feeds inside." },
  { pestName:"Blast Disease",    region:"Uttar Pradesh",  severity:"high",   affectedCrops:["Rice","Wheat"],       treatment:"Tricyclazole 75% WP @ 200g/acre",             organicTreatment:"Resistant varieties",          description:"Diamond-shaped lesions on leaves and neck." },

  // ── MAHARASHTRA ──
  { pestName:"Helicoverpa",      region:"Maharashtra",    severity:"high",   affectedCrops:["Cotton","Chickpea","Tomato"], treatment:"Indoxacarb 14.5% SC @ 200ml/acre",    organicTreatment:"Pheromone traps + HNPV spray", description:"Bores into bolls, pods and fruits." },
  { pestName:"Thrips",           region:"Maharashtra",    severity:"medium", affectedCrops:["Cotton","Onion","Chilli"], treatment:"Spinosad 45% SC @ 75ml/acre",           organicTreatment:"Blue sticky traps",            description:"Silvery patches on leaves. Spreads in dry conditions." },
  { pestName:"Late Blight",      region:"Maharashtra",    severity:"high",   affectedCrops:["Potato","Tomato"],    treatment:"Metalaxyl 8% + Mancozeb 64% WP @ 600g/acre", organicTreatment:"Copper hydroxide spray",      description:"Water-soaked lesions. Spreads in humid cool nights." },

  // ── MADHYA PRADESH ──
  { pestName:"Soybean Girdle Beetle", region:"Madhya Pradesh", severity:"high", affectedCrops:["Soybean"],       treatment:"Triazophos 40% EC @ 400ml/acre",              organicTreatment:"Remove and destroy affected stems", description:"Girdles stem, plants fall over and die." },
  { pestName:"Stem Fly",         region:"Madhya Pradesh", severity:"medium", affectedCrops:["Soybean","Moong"],   treatment:"Dimethoate 30% EC @ 350ml/acre",              organicTreatment:"Early sowing, resistant varieties", description:"Mines inside the stem, causes yellowing." },
  { pestName:"Collar Rot",       region:"Madhya Pradesh", severity:"medium", affectedCrops:["Groundnut","Soybean"], treatment:"Carbendazim 50% WP @ 2g/L soil drench",    organicTreatment:"Trichoderma seed treatment",   description:"Rotting at soil level. Seedlings collapse." },

  // ── GUJARAT ──
  { pestName:"Sucking Pest Complex", region:"Gujarat",    severity:"high",   affectedCrops:["Cotton","Groundnut"], treatment:"Thiamethoxam 25% WG @ 80g/acre",            organicTreatment:"Neem seed kernel extract",     description:"Mixed infestation of whitefly, thrips and aphids." },
  { pestName:"Leaf Miner",       region:"Gujarat",        severity:"medium", affectedCrops:["Groundnut","Castor"], treatment:"Cyromazine 75% WP @ 200g/acre",               organicTreatment:"Remove affected leaves",       description:"Serpentine mines on leaves. Reduces photosynthesis." },

  // ── ANDHRA PRADESH ──
  { pestName:"Yellow Stem Borer", region:"Andhra Pradesh", severity:"high",  affectedCrops:["Rice","Paddy"],      treatment:"Carbofuran 3G @ 8kg/acre or Cartap 4G",      organicTreatment:"Pheromone traps",              description:"Dead heart in vegetative, white ear in reproductive stage." },
  { pestName:"Spodoptera",       region:"Andhra Pradesh", severity:"high",   affectedCrops:["Maize","Paddy","Sugarcane"], treatment:"Emamectin Benzoate 5% SG @ 80g/acre",  organicTreatment:"SpIt NPV spray",              description:"Fall armyworm. Skeletonizes maize whorl leaves." },

  // ── TELANGANA ──
  { pestName:"Mango Hopper",     region:"Telangana",      severity:"medium", affectedCrops:["Mango"],              treatment:"Imidacloprid 17.8% SL @ 0.5ml/L",            organicTreatment:"Kaolin clay spray",            description:"Sucks sap from flowers. Causes flower and fruit drop." },
  { pestName:"Red Hairy Caterpillar", region:"Telangana", severity:"high",   affectedCrops:["Groundnut","Maize","Castor"], treatment:"Quinalphos 25% EC @ 400ml/acre",      organicTreatment:"Collect and destroy caterpillars", description:"Mass migration, defoliates entire fields." },

  // ── TAMIL NADU ──
  { pestName:"Rice Gall Midge",  region:"Tamil Nadu",     severity:"high",   affectedCrops:["Rice","Paddy"],       treatment:"Phorate 10G @ 8kg/acre",                     organicTreatment:"Resistant varieties like Vikramarya", description:"Silver shoot (onion leaf) symptom." },
  { pestName:"Coconut Rhinoceros Beetle", region:"Tamil Nadu", severity:"high", affectedCrops:["Coconut"],         treatment:"Gammexane + naphthalene ball in crown",       organicTreatment:"Metarhizium fungus biopesticide", description:"Bores into crown, V-shaped cuts on leaves." },

  // ── KERALA ──
  { pestName:"Coconut Mite",     region:"Kerala",         severity:"medium", affectedCrops:["Coconut"],            treatment:"Wettable Sulfur spray on bunches",            organicTreatment:"Neem oil 3% spray",            description:"Causes button shedding and nut scarring." },
  { pestName:"Pepper Pollu Beetle", region:"Kerala",      severity:"high",   affectedCrops:["Black Pepper"],       treatment:"Carbaryl 50% WP @ 2g/L",                     organicTreatment:"Collect and destroy fallen berries", description:"Bore into berries, causes premature dropping." },

  // ── KARNATAKA ──
  { pestName:"Coffee Berry Borer", region:"Karnataka",    severity:"high",   affectedCrops:["Coffee"],             treatment:"Endosulfan 35% EC @ 1L/acre",                organicTreatment:"Pheromone traps, Beauveria bassiana", description:"Bores into coffee berries, destroys crop." },
  { pestName:"Ragi Shoot Fly",   region:"Karnataka",      severity:"medium", affectedCrops:["Ragi","Maize"],       treatment:"Carbofuran 3G @ 8kg/acre",                   organicTreatment:"Early sowing, seedling dip",   description:"Dead heart symptom in young seedlings." },

  // ── WEST BENGAL ──
  { pestName:"Rice Hispa",       region:"West Bengal",    severity:"medium", affectedCrops:["Rice","Paddy"],       treatment:"Quinalphos 25% EC @ 300ml/acre",              organicTreatment:"Clipping and removing leaves", description:"White parallel streaks on leaves." },
  { pestName:"Jute Hairy Caterpillar", region:"West Bengal", severity:"high", affectedCrops:["Jute"],             treatment:"Endosulfan 35% EC @ 1L/acre",                organicTreatment:"Hand pick caterpillars",       description:"Defoliates jute plants rapidly." },

  // ── ODISHA ──
  { pestName:"Rice Ear Head Bug", region:"Odisha",        severity:"high",   affectedCrops:["Rice","Paddy"],       treatment:"Monocrotophos 36% SL @ 400ml/acre",          organicTreatment:"Light traps near fields",      description:"Sucks milky grain, causes chaffy grain." },

  // ── BIHAR ──
  { pestName:"Maize Stalk Rot",  region:"Bihar",          severity:"medium", affectedCrops:["Maize"],              treatment:"Metalaxyl seed treatment",                   organicTreatment:"Crop rotation, proper drainage", description:"Stem becomes soft, plants lodge." },
  { pestName:"Mustard Sawfly",   region:"Bihar",          severity:"high",   affectedCrops:["Mustard","Rapeseed"], treatment:"Malathion 50% EC @ 300ml/acre",               organicTreatment:"Collect larvae manually",      description:"Larvae skeletonize leaves rapidly." },

  // ── JHARKHAND ──
  { pestName:"Termites",         region:"Jharkhand",      severity:"medium", affectedCrops:["Maize","Wheat","Groundnut"], treatment:"Chlorpyriphos 20% EC soil drench",     organicTreatment:"Neem cake soil application",   description:"Attack roots, plants wilt suddenly." },

  // ── ASSAM ──
  { pestName:"Tea Mosquito Bug", region:"Assam",          severity:"high",   affectedCrops:["Tea"],                treatment:"Quinalphos 25% EC @ 400ml/acre",              organicTreatment:"Neem oil 3% spray",            description:"Causes blisters on tea shoots. Reduces quality." },

  // ── HIMACHAL PRADESH ──
  { pestName:"Codling Moth",     region:"Himachal Pradesh", severity:"high", affectedCrops:["Apple","Pear"],       treatment:"Azinphos-methyl spray after petal fall",     organicTreatment:"Pheromone traps",              description:"Larvae bore into apple fruits." },
  { pestName:"San Jose Scale",   region:"Himachal Pradesh", severity:"medium", affectedCrops:["Apple","Peach"],    treatment:"DNOC spray in dormant season",               organicTreatment:"Scraping bark, lime sulfur",   description:"Grey crust on bark, weakens tree." },

  // ── UTTARAKHAND ──
  { pestName:"Potato Late Blight", region:"Uttarakhand",  severity:"high",   affectedCrops:["Potato"],             treatment:"Metalaxyl + Mancozeb @ 600g/acre",           organicTreatment:"Copper oxychloride spray",     description:"Water-soaked spots, spreads in cool wet weather." },

  // ── CHHATTISGARH ──
  { pestName:"Rice Gundhi Bug",  region:"Chhattisgarh",   severity:"medium", affectedCrops:["Rice","Paddy"],       treatment:"Malathion dust 5% @ 20kg/acre",              organicTreatment:"Pheromone traps",              description:"Foul smell in field. Sucks milky grain." },

  // ── TRIPURA ──
  { pestName:"Bamboo Mealybug",  region:"Tripura",        severity:"medium", affectedCrops:["Bamboo","Sugarcane"], treatment:"Dimethoate 30% EC @ 250ml/acre",              organicTreatment:"Remove and destroy affected parts", description:"White cottony mass on bamboo internodes." },

  // ── GOA ──
  { pestName:"Cashew Tea Mosquito Bug", region:"Goa",     severity:"high",   affectedCrops:["Cashew"],             treatment:"Lambda Cyhalothrin 5% EC @ 200ml/acre",      organicTreatment:"Neem oil spray",               description:"Causes blossom blight, reduces cashew yield." },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await PestAlert.deleteMany({});
    console.log("🗑️  Old alerts cleared");

    await PestAlert.insertMany(alerts);
    console.log(`✅ ${alerts.length} pest alerts seeded for all Indian states!`);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
