// Pan-India Administrative Hierarchy (State -> District -> Sub-district / Tehsil -> Village)
// With agricultural coordinates for precision Open-Meteo live weather

export const INDIA_ADMIN_HIERARCHY = {
  Punjab: {
    code: "PB",
    lat: 30.9010,
    lon: 75.8573,
    districts: {
      Ludhiana: {
        lat: 30.9010,
        lon: 75.8573,
        subDistricts: {
          "Ludhiana West": ["Lalton Kalan", "Ayali Kalan", "Issewal", "Baddowal", "Barewal Awana"],
          "Ludhiana East": ["Koom Kalan", "Katani Kalan", "Kohara", "Mundian Kalan", "Mattewara"],
          "Jagraon": ["Sohian", "Swaddi Khas", "Dakha", "Chowkiman", "Aligarh"],
          "Khanna": ["Ikolaha", "Lalheri", "Bhadla", "Ratanheri", "Alour"],
          "Samrala": ["Bondli", "Ghorewahan", "Otal", "Herian", "Machhiwara"],
          "Payal": ["Dhamot", "Chhapar", "Ghudani Kalan", "Sihorha", "Doraha"],
          "Raikot": ["Bassian", "Lohatbaddi", "Talwandi Rai", "Halwara", "Barundi"]
        }
      },
      Amritsar: {
        lat: 31.6340,
        lon: 74.8723,
        subDistricts: {
          "Amritsar-I": ["Verka", "Kala Ghanupur", "Wadala Bhittewad", "Vallah"],
          "Amritsar-II": ["Chogawan", "Lopoke", "Attari", "Khasa"],
          "Ajnala": ["Ramdas", "Gagomahal", "Chamiari", "Ballagan"],
          "Baba Bakala": ["Beas", "Sathiala", "Rayya", "Khilchian"],
          "Majitha": ["Kathunangal", "Nag Kalan", "Marari Kalan", "Sohian Kalan"]
        }
      },
      Bathinda: {
        lat: 30.2110,
        lon: 74.9455,
        subDistricts: {
          "Bathinda": ["Bhiru", "Bhucho Mandi", "Naruana", "Deon", "Balluana"],
          "Talwandi Sabo": ["Rama Mandi", "Singhaman", "Koreana", "Bhagi Wandar"],
          "Rampura Phul": ["Mehraj", "Bhagta Bhaika", "Kotha Guru", "Dyalpura Bhaika"],
          "Maur": ["Kotli Kalan", "Mansa Khurd", "Chauke", "Maisar Khana"]
        }
      },
      Jalandhar: {
        lat: 31.3260,
        lon: 75.5762,
        subDistricts: {
          "Jalandhar-I": ["Adampur", "Alawalpur", "Kandu Kalan", "Dhilwan"],
          "Jalandhar-II": ["Kartarpur", "Lambra", "Nussi", "Chittewani"],
          "Nakodar": ["Mehatpur", "Uggi", "Mallian", "Shahpur"],
          "Phillaur": ["Goraya", "Rurka Kalan", "Apra", "Bara Pind"],
          "Shahkot": ["Lohian Khas", "Malsian", "Parjian Kalan", "Rupewali"]
        }
      },
      Patiala: {
        lat: 30.3398,
        lon: 76.3869,
        subDistricts: {
          "Patiala": ["Sanaur", "Kalyan", "Dakala", "Bahadurgarh"],
          "Nabha": ["Bhadson", "Rohti Chhanna", "Aganpur", "Kakrala"],
          "Rajpura": ["Ghanaur", "Shambhu", "Kharajpur", "Jansua"],
          "Samana": ["Ghagga", "Mawi Kalan", "Fatehpur", "Retgarh"]
        }
      },
      Sangrur: {
        lat: 30.2458,
        lon: 75.8421,
        subDistricts: {
          "Sangrur": ["Badrukhan", "Ubhawal", "Ghabdan", "Bhadur"],
          "Sunam": ["Chhajli", "Dirba", "Jakhepal", "Mehlan"],
          "Dhuri": ["Benra", "Ladda", "Bhalwan", "Kakarwal"],
          "Lehragaga": ["Chotian", "Gaga", "Khandebad", "Moonak"]
        }
      },
      Hoshiarpur: {
        lat: 31.5273,
        lon: 75.9149,
        subDistricts: {
          "Hoshiarpur": ["Nasrala", "Bajwara", "Attowal", "Bulhowal"],
          "Dasuya": ["Urmar Tanda", "Garhdiwala", "Kainthan", "Garna Sahib"],
          "Mukerian": ["Talwara", "Hajipur", "Bhangala", "Datarpur"],
          "Garhshankar": ["Mahilpur", "Saila Khurd", "Kot Fatuhi", "Binsan"]
        }
      },
      Firozpur: {
        lat: 30.9237,
        lon: 74.6138,
        subDistricts: {
          "Firozpur": ["Kassowala", "Mamdot", "Hussainiwala", "Mudh"],
          "Zira": ["Makhu", "Talwandi Jalle Khan", "Mallanwala"],
          "Guru Har Sahai": ["Jhok Harihar", "Panje Ke Uttar", "Bhanwar"]
        }
      },
      Gurdaspur: {
        lat: 32.0419,
        lon: 75.4053,
        subDistricts: {
          "Gurdaspur": ["Dhariwal", "Dinanagar", "Paniar", "Tibri"],
          "Batala": ["Qadian", "Fatehgarh Churian", "Aliwal", "Udhanwal"],
          "Dera Baba Nanak": ["Kalanaur", "Hardorwal", "Shikhar Masanian"]
        }
      },
      Moga: {
        lat: 30.8165,
        lon: 75.1717,
        subDistricts: {
          "Moga": ["Singhanwala", "Dharamkot", "Charik", "Baghapurana"],
          "Baghapurana": ["Nihal Singh Wala", "Rode", "Lande", "Nathuwala"],
          "Dharamkot": ["Kot Ise Khan", "Fatehgarh Panjtoor", "Jalalabad"]
        }
      }
    }
  },

  Haryana: {
    code: "HR",
    lat: 29.6857,
    lon: 76.9905,
    districts: {
      Karnal: {
        lat: 29.6857,
        lon: 76.9905,
        subDistricts: {
          "Karnal": ["Taraori", "Kunjpura", "Gharaunda", "Kachhwa", "Indri"],
          "Gharaunda": ["Kohand", "Bastara", "Kutail", "Chaura"],
          "Assandh": ["Jalmana", "Balla", "Rangrutti Kalan", "Salwan"],
          "Indri": ["Bhambarehri", "Ghir", "Baragaon", "Chhapra"],
          "Nilokheri": ["Pujam", "Nadana", "Taraori Mandi", "Sultanpur"]
        }
      },
      Kurukshetra: {
        lat: 29.9695,
        lon: 76.8783,
        subDistricts: {
          "Thanesar": ["Pipli", "Umri", "Jyotisar", "Amin"],
          "Pehowa": ["Gumthala Garhu", "Ismailabad", "Saraswati Nagar"],
          "Shahbad": ["Babain", "Nalvi", "Kharindwa", "Tangore"],
          "Ladwa": ["Barshami", "Dhanora", "Mehra", "Babain"]
        }
      },
      Ambala: {
        lat: 30.3782,
        lon: 76.7767,
        subDistricts: {
          "Ambala": ["Panjokhra", "Khurd", "Mullana", "Naggal"],
          "Barara": ["Adhoya", "Thamber", "Tandwal", "Talheri"],
          "Naraingarh": ["Shahzadpur", "Banondi", "Burewala"]
        }
      },
      Hisar: {
        lat: 29.1492,
        lon: 75.7217,
        subDistricts: {
          "Hisar": ["Balsamand", "Satrod Kalan", "Mangali", "Aryanagar"],
          "Hansi": ["Bass", "Sisai", "Ugalan", "Dhana Kalan"],
          "Barwala": ["Daulatpur", "Panghal", "Khedar", "Bugana"],
          "Narnaund": ["Khanda Kheri", "Baas Azam Shahpur", "Mirchpur"]
        }
      },
      Sirsa: {
        lat: 29.5330,
        lon: 75.0177,
        subDistricts: {
          "Sirsa": ["Rania", "Kalanwali", "Chopta", "Ding"],
          "Dabwali": ["Desujodha", "Gidderbaha border", "Odhan"],
          "Ellenabad": ["Kharia", "Mithanpura", "Talwara Khurd"]
        }
      },
      Sonipat: {
        lat: 28.9931,
        lon: 77.0151,
        subDistricts: {
          "Sonipat": ["Murthal", "Rai", "Ganaur", "Kundli"],
          "Gohana": ["Baroda", "Mundlana", "Kathura", "Khanpur Kalan"],
          "Kharkhoda": ["Pipli", "Farmana", "Rohat", "Silana"]
        }
      }
    }
  },

  "Uttar Pradesh": {
    code: "UP",
    lat: 26.8467,
    lon: 80.9462,
    districts: {
      Lucknow: {
        lat: 26.8467,
        lon: 80.9462,
        subDistricts: {
          "Bakshi Ka Talab": ["Kathwara", "Asthona", "Bhaisamau", "Itaunja"],
          "Malihabad": ["Rahimabad", "Saspan", "Kakori", "Kasmandi Kalan"],
          "Mohanlalganj": ["Gosainganj", "Nagram", "Sissendi", "Khujauli"],
          "Sarojini Nagar": ["Banthra", "Harauni", "Piparsand", "Natkur"]
        }
      },
      Agra: {
        lat: 27.1767,
        lon: 78.0081,
        subDistricts: {
          "Etmadpur": ["Khandauli", "Barhan", "Semra", "Dhanoli"],
          "Fatehabad": ["Dauki", "Bhadroli", "Shamshabad", "Dhimishri"],
          "Kheragarh": ["Saiyan", "Jagner", "Sikrauda", "Kagarol"],
          "Bah": ["Pinahat", "Jaitpur", "Chambal border", "Bateshwar"]
        }
      },
      Varanasi: {
        lat: 25.3176,
        lon: 82.9739,
        subDistricts: {
          "Pindra": ["Phulpur", "Baragaon", "Sindhora", "Mangari"],
          "Raja Talab": ["Araziline", "Sewapuri", "Jakhini", "Kachnar"],
          "Varanasi Sadar": ["Shivpur", "Kashi", "Ramnagar", "Chiraigaon"]
        }
      },
      Meerut: {
        lat: 28.9845,
        lon: 77.7064,
        subDistricts: {
          "Mawana": ["Hastinapur", "Parikshitgarh", "Bahsuma", "Kithore"],
          "Sardhana": ["Daurala", "Kaili", "Lawa", "Sakhoti"],
          "Meerut": ["Rohata", "Jani Khurd", "Bhavanpur", "Kharkhoda"]
        }
      },
      "Kanpur Nagar": {
        lat: 26.4499,
        lon: 80.3319,
        subDistricts: {
          "Bilhaur": ["Chaubepur", "Shivrajpur", "Kakwan", "Makanpur"],
          "Ghatampur": ["Sajeti", "Bhitargaon", "Patara", "Reuna"],
          "Kanpur Sadar": ["Bidhnu", "Kalyanpur", "Sarsaul", "Maharajpur"]
        }
      },
      Prayagraj: {
        lat: 25.4358,
        lon: 81.8463,
        subDistricts: {
          "Phulpur": ["Baharia", "Sahson", "Jhusi", "Kotwa"],
          "Soraon": ["Mauaima", "Holagarh", "Kaurihar", "Shringverpur"],
          "Karchhana": ["Chaka", "Kaundhiyara", "Jasra", "Shankargarh"],
          "Handia": ["Saidabad", "Pratappur", "Dhanupur", "Bara"]
        }
      }
    }
  },

  Rajasthan: {
    code: "RJ",
    lat: 26.9124,
    lon: 75.7873,
    districts: {
      Jaipur: {
        lat: 26.9124,
        lon: 75.7873,
        subDistricts: {
          "Chomu": ["Morija", "Harsoli", "Samod", "Kishangarh Renwal"],
          "Kotputli": ["Paota", "Pratappura", "Bansur border", "Kalyanpura"],
          "Sanganer": ["Watika", "Muhana Mandi", "Bagru", "Nevta"],
          "Bassie": ["Banskho", "Tunga", "Jhar", "Dhana"],
          "Amer": ["Kukas", "Achrol", "Chandwaji", "Bhatwada"]
        }
      },
      Alwar: {
        lat: 27.5530,
        lon: 76.6346,
        subDistricts: {
          "Ramgarh": ["Naugaon", "Bamboli", "Alawada", "Kishangarh Bas"],
          "Tijara": ["Bhiwadi", "Tapukara", "Kotkasim", "Shahjahanpur"],
          "Rajgarh": ["Reni", "Machari", "Tehla", "Pratapgarh"],
          "Behror": ["Bardod", "Majri", "Mandhan", "Neemrana"],
          "Thanagazi": ["Ajabgarh", "Bhangarh", "Malakhera", "Ghirkar"]
        }
      },
      Kota: {
        lat: 25.2138,
        lon: 75.8648,
        subDistricts: {
          "Ladpura": ["Mandana", "Ranpur", "Dhakadpura", "Kasba"],
          "Ramganj Mandi": ["Chechat", "Modak", "Suket", "Kumbhkot"],
          "Digod": ["Sultanpur", "Simliya", "Budhadit", "Awan"],
          "Sangod": ["Kanwas", "Bapawar Kalan", "Dhulet", "Moondla"]
        }
      },
      Jodhpur: {
        lat: 26.2389,
        lon: 73.0243,
        subDistricts: {
          "Osian": ["Tiwari", "Bhopalgarh", "Mathania", "Baori"],
          "Bilara": ["Piparcity", "Bhavi", "Pichiyak", "Khejarli"],
          "Phalodi": ["Bap", "Lohawat", "Bhojasar", "Aau"]
        }
      },
      "Sri Ganganagar": {
        lat: 29.9038,
        lon: 73.8772,
        subDistricts: {
          "Ganganagar": ["Karanpur", "Sadulshahar", "Mirzewala", "Hindumalkot"],
          "Suratgarh": ["Jaitsar", "Rajpura Pipan", "Pilibanga border"],
          "Anupgarh": ["Gharsana", "Rawla Mandi", "Ramsinghpur"]
        }
      }
    }
  },

  "Madhya Pradesh": {
    code: "MP",
    lat: 23.2599,
    lon: 77.4126,
    districts: {
      Bhopal: {
        lat: 23.2599,
        lon: 77.4126,
        subDistricts: {
          "Huzur": ["Berasia", "Kolar", "Sukhi Sewania", "Tumda", "Islamnagar"],
          "Berasia": ["Nazirabad", "Runaha", "Damkheda", "Gunga"]
        }
      },
      Indore: {
        lat: 22.7196,
        lon: 75.8577,
        subDistricts: {
          "Sanwer": ["Dharampuri", "Kshipra", "Palasiya", "Chandrawatiganj"],
          "Depalpur": ["Betma", "Gautampura", "Machal", "Banedia"],
          "Mhow": ["Hasalpur", "Manpur", "Patalpani", "Jamli"]
        }
      },
      Ujjain: {
        lat: 23.1765,
        lon: 75.7885,
        subDistricts: {
          "Ujjain": ["Tajpur", "Panthpiplai", "Lekoda", "Chintaman"],
          "Nagda": ["Khachrod", "Bhatpachlana", "Padlya"],
          "Tarana": ["Kayatha", "Naredi Kalan", "Sumrakheda"],
          "Mahidpur": ["Jharda", "Raghavi", "Gogapur", "Khedawad"]
        }
      },
      Dewas: {
        lat: 22.9676,
        lon: 76.0534,
        subDistricts: {
          "Dewas": ["Tonk Khurd", "Sonkatch", "Bhorasa", "Pipri"],
          "Bagli": ["Hatpipliya", "Karnawad", "Chapda", "Udainagar"],
          "Kannod": ["Khategaon", "Nemawar", "Sandhani", "Bijwad"]
        }
      },
      Hoshangabad: {
        lat: 22.7519,
        lon: 77.7289,
        subDistricts: {
          "Narmadapuram": ["Babai", "Rasulia", "Dongarwada", "Malanpur"],
          "Itarsi": ["Dolariya", "Kesla", "Sukhtawa", "Pathrota"],
          "Pipariya": ["Sohagpur", "Bankhedi", "Semri Harchand"]
        }
      }
    }
  },

  Maharashtra: {
    code: "MH",
    lat: 19.7515,
    lon: 75.7139,
    districts: {
      Pune: {
        lat: 18.5204,
        lon: 73.8567,
        subDistricts: {
          "Baramati": ["Malegaon", "Someshwar", "Supe", "Morgaon", "Shirsuphal"],
          "Shirur": ["Shikrapur", "Ranjangaon", "Mandavgan", "Nighoj"],
          "Indapur": ["Bawada", "Nimgaon Ketki", "Walchandnagar"],
          "Junnar": ["Narayangaon", "Otur", "Alephata", "Ozar"],
          "Khed": ["Chakan", "Alandi", "Rajgurunagar", "Kadus"]
        }
      },
      Nashik: {
        lat: 19.9975,
        lon: 73.7898,
        subDistricts: {
          "Niphad": ["Pimpalgaon Baswant", "Lasalgaon Mandi", "Ozar", "Ranwad"],
          "Dindori": ["Vani", "Janori", "Khedgaon", "Nanashi"],
          "Malegaon": ["Satana", "Nampur", "Ravalgon", "Vadner"],
          "Sinnar": ["Wavi", "Pangri", "Dapur", "Naygaon"]
        }
      },
      Nagpur: {
        lat: 21.1458,
        lon: 79.0882,
        subDistricts: {
          "Katol": ["Narkhed", "Mowad", "Kondhali", "Sawargaon"],
          "Saoner": ["Kalmeshwar", "Kelod", "Dhapewada", "Khapa"],
          "Umred": ["Kuhi", "Bhiwapur", "Sirsi", "Makardhokra"],
          "Ramtek": ["Parseoni", "Mansar", "Deolapar", "Bhandarbodi"]
        }
      },
      Ahmednagar: {
        lat: 19.0948,
        lon: 74.7480,
        subDistricts: {
          "Rahata": ["Shirdi", "Loni", "Babhaleshwar", "Sakuri"],
          "Sangamner": ["Ashwi", "Talegaon", "Jawale Baleshwar"],
          "Kopargaon": ["Pohegaon", "Rawande", "Dhamori", "Sasure"],
          "Shrirampur": ["Belapur", "Padhegaon", "Taklibhan"]
        }
      },
      Solapur: {
        lat: 17.6599,
        lon: 75.9064,
        subDistricts: {
          "Pandharpur": ["Karkamb", "Bhalwani", "Tungat", "Kasegaon"],
          "Barshi": ["Vairag", "Pangri", "Upale", "Goudgaon"],
          "Malshiras": ["Akluj", "Natepute", "Velapur", "Dahigaon"]
        }
      }
    }
  },

  Gujarat: {
    code: "GJ",
    lat: 22.2587,
    lon: 71.1924,
    districts: {
      Rajkot: {
        lat: 22.3039,
        lon: 70.8022,
        subDistricts: {
          "Gondal": ["Bhadwa", "Virpur", "Kotda Sangani", "Gomta"],
          "Jetpur": ["Dhoraji", "Upleta", "Pithadiya", "Navagadh"],
          "Jasdan": ["Vinchhiya", "Atkot", "Kamlapur", "Ghela Somnath"]
        }
      },
      Junagadh: {
        lat: 21.5222,
        lon: 70.4579,
        subDistricts: {
          "Keshod": ["Mangrol", "Malia Hatina", "Sil", "Agatrai"],
          "Visavadar": ["Bhesan", "Bilkha", "Mendarda", "Sarsai"]
        }
      },
      Mehsana: {
        lat: 23.5880,
        lon: 72.3693,
        subDistricts: {
          "Unjha": ["Kadi", "Visnagar", "Vadnagar", "Bhandu"],
          "Becharaji": ["Sankhari", "Modhera", "Mandal"]
        }
      },
      Banaskantha: {
        lat: 24.1724,
        lon: 72.4346,
        subDistricts: {
          "Palanpur": ["Deesa", "Dhanera", "Tharad", "Vav"],
          "Danta": ["Ambaji", "Amirgadh", "Vadgam", "Bhabhar"]
        }
      }
    }
  },

  Bihar: {
    code: "BR",
    lat: 25.0961,
    lon: 85.3131,
    districts: {
      Patna: {
        lat: 25.5941,
        lon: 85.1376,
        subDistricts: {
          "Bihta": ["Maner", "Parew", "Danapur", "Shivala"],
          "Barh": ["Bakhtiarpur", "Mokama", "Ghoswari", "Pandarak"],
          "Masaurhi": ["Dhanarua", "Punpun", "Taregna", "Kadirganj"],
          "Paliganj": ["Dulhin Bazar", "Bikram", "Sigori", "Mera"]
        }
      },
      Muzaffarpur: {
        lat: 26.1209,
        lon: 85.3647,
        subDistricts: {
          "Kanti": ["Motipur", "Baruraj", "Minapur", "Panapur"],
          "Sakra": ["Dholi", "Kudra", "Muraul", "Bandra"],
          "Sahebganj": ["Paroo", "Saraiya", "Deoria", "Jaitpur"]
        }
      },
      Samastipur: {
        lat: 25.8629,
        lon: 85.7811,
        subDistricts: {
          "Pusa": ["RPCAU Campus", "Mahmoodpur", "Kalyanpur", "Morwa"],
          "Dalsinghsarai": ["Ujiarpur", "Bibhutipur", "Rosera", "Singhia"],
          "Mohiuddinagar": ["Patori", "Mohanpur", "Shahpur Patori"]
        }
      },
      Gaya: {
        lat: 24.7955,
        lon: 85.0002,
        subDistricts: {
          "Bodh Gaya": ["Sherghati", "Tekari", "Manpur", "Belaganj"],
          "Wazirganj": ["Fatehpur", "Atri", "Mohanpur", "Barachatti"]
        }
      }
    }
  },

  "West Bengal": {
    code: "WB",
    lat: 22.9868,
    lon: 87.8550,
    districts: {
      "Purba Bardhaman": {
        lat: 23.2324,
        lon: 87.8615,
        subDistricts: {
          "Bardhaman Sadar": ["Memari", "Galsi", "Bhatar", "Shaktigarh"],
          "Kalna": ["Dhatrigram", "Purbasthali", "Nabadwip border"],
          "Katwa": ["Ketugram", "Mongalkote", "Dainhat", "Singhi"]
        }
      },
      Hooghly: {
        lat: 22.9080,
        lon: 88.3968,
        subDistricts: {
          "Arambagh": ["Tarakeswar", "Goghat", "Khanakul", "Pursurah"],
          "Chandannagar": ["Singur", "Haripal", "Bhadreswar", "Polba"]
        }
      },
      Nadia: {
        lat: 23.4710,
        lon: 88.5565,
        subDistricts: {
          "Krishnanagar": ["Nabadwip", "Nakashipara", "Chapra", "Dhubulia"],
          "Ranaghat": ["Santipur", "Hanskhali", "Chakdaha", "Haringhata"]
        }
      }
    }
  },

  "Andhra Pradesh": {
    code: "AP",
    lat: 15.9129,
    lon: 79.7400,
    districts: {
      Guntur: {
        lat: 16.3067,
        lon: 80.4365,
        subDistricts: {
          "Tenali": ["Kollipara", "Duggirala", "Tsundur", "Amruthalur"],
          "Mangalagiri": ["Tadikonda", "Pedakakani", "Thullur"],
          "Ponnur": ["Bapatla", "Chebrolu", "Kakumanu", "Karlapalem"]
        }
      },
      Krishna: {
        lat: 16.1809,
        lon: 81.1303,
        subDistricts: {
          "Gudivada": ["Pamarru", "Nandivada", "Mudinepalli", "Pedaparupudi"],
          "Machilipatnam": ["Challapalli", "Avanigadda", "Nagayalanka"]
        }
      },
      "West Godavari": {
        lat: 16.7107,
        lon: 81.0952,
        subDistricts: {
          "Bhimavaram": ["Palakollu", "Narsapur", "Tanuku", "Tadepalligudem"],
          "Eluru": ["Denduluru", "Chintalapudi", "Jangareddygudem"]
        }
      }
    }
  },

  Telangana: {
    code: "TG",
    lat: 18.1124,
    lon: 79.0193,
    districts: {
      Warangal: {
        lat: 17.9689,
        lon: 79.5941,
        subDistricts: {
          "Warangal": ["Geesugonda", "Atmakur", "Dharmasagar", "Inavolu"],
          "Narsampet": ["Chennaraopet", "Duggondi", "Khanapur", "Nekkonda"]
        }
      },
      Karimnagar: {
        lat: 18.4386,
        lon: 79.1288,
        subDistricts: {
          "Karimnagar": ["Manakondur", "Choppadandi", "Huzurabad", "Jammikunta"],
          "Jagtial": ["Korutla", "Metpally", "Raikal", "Dharmapuri"]
        }
      },
      Nizamabad: {
        lat: 18.6725,
        lon: 78.0941,
        subDistricts: {
          "Armoor": ["Balkonda", "Morangal", "Kammarpally", "Jakranpally"],
          "Bodhan": ["Kotgiri", "Ranjal", "Rudrur", "Varni"]
        }
      }
    }
  },

  Karnataka: {
    code: "KA",
    lat: 15.3173,
    lon: 75.7139,
    districts: {
      Belagavi: {
        lat: 15.8497,
        lon: 74.4977,
        subDistricts: {
          "Chikkodi": ["Nipani", "Sadalga", "Examba", "Kagwad"],
          "Gokak": ["Mudalgi", "Koujalgi", "Arabhavi", "Ghataprabha"],
          "Bailhongal": ["Kittur", "Nesargi", "Sampgaon", "Saundatti"]
        }
      },
      Mandya: {
        lat: 12.5218,
        lon: 76.8951,
        subDistricts: {
          "Mandya": ["Maddur", "Pandavapura", "Srirangapatna", "Malavalli"],
          "Nagamangala": ["Krishnarajpet", "Bellur", "Bindiganavile"]
        }
      },
      Dharwad: {
        lat: 15.4589,
        lon: 75.0078,
        subDistricts: {
          "Dharwad": ["Hubballi", "Kundgol", "Navalgund", "Alnavar"],
          "Kalghatgi": ["Misrikoti", "Dummavad", "Mishrikoti"]
        }
      }
    }
  },

  "Tamil Nadu": {
    code: "TN",
    lat: 11.1271,
    lon: 78.6569,
    districts: {
      Thanjavur: {
        lat: 10.7870,
        lon: 79.1378,
        subDistricts: {
          "Thanjavur": ["Vallam", "Budalur", "Thiruvaiyaru", "Kandiyur"],
          "Kumbakonam": ["Papanasam", "Thiruvidaimarudur", "Swamimalai"],
          "Pattukkottai": ["Peravurani", "Madukkur", "Adirampattinam"]
        }
      },
      Madurai: {
        lat: 9.9252,
        lon: 78.1198,
        subDistricts: {
          "Vadipatti": ["Sholavandan", "Alanganallur", "Palamedu"],
          "Melur": ["Kottampatti", "Othakadai", "Thiruvathavur"],
          "Usilampatti": ["Sedapatti", "Chekkanurani", "T.Kallupatti"]
        }
      },
      Coimbatore: {
        lat: 11.0168,
        lon: 76.9558,
        subDistricts: {
          "Pollachi": ["Anaimalai", "Kinathukadavu", "Kottur", "Negamam"],
          "Mettupalayam": ["Karamadai", "Sirumugai", "Annur", "Sulur"]
        }
      }
    }
  },

  Kerala: {
    code: "KL",
    lat: 10.8505,
    lon: 76.2711,
    districts: {
      Palakkad: {
        lat: 10.7867,
        lon: 76.6548,
        subDistricts: {
          "Alathur": ["Chittur", "Kollengode", "Kuzhalmannam", "Nenmara"],
          "Ottapalam": ["Pattambi", "Cherpulassery", "Shornur", "Ongallur"],
          "Mannarkkad": ["Agali", "Attappadi", "Kanjirapuzha"]
        }
      },
      Wayanad: {
        lat: 11.6854,
        lon: 76.1320,
        subDistricts: {
          "Sulthan Bathery": ["Ambalavayal", "Meenangadi", "Noolpuzha"],
          "Mananthavady": ["Panamaram", "Thirunelly", "Vellamunda"],
          "Vythiri": ["Kalpetta", "Meppadi", "Pozhuthana"]
        }
      }
    }
  },

  Odisha: {
    code: "OD",
    lat: 20.9517,
    lon: 85.9818,
    districts: {
      Sambalpur: {
        lat: 21.4669,
        lon: 83.9812,
        subDistricts: {
          "Sambalpur": ["Hirakud", "Dhankauda", "Maneswar", "Jujumura"],
          "Rairakhol": ["Kuchinda", "Bamra", "Jamankira", "Naktideul"]
        }
      },
      Bargarh: {
        lat: 21.3340,
        lon: 83.6212,
        subDistricts: {
          "Bargarh": ["Attabira", "Barpali", "Bhatli", "Bheden"],
          "Padampur": ["Paikmal", "Jharbandh", "Gaisilet", "Sohela"]
        }
      },
      Cuttack: {
        lat: 20.4625,
        lon: 85.8828,
        subDistricts: {
          "Athagarh": ["Banki", "Tigiria", "Baramba", "Narasinghpur"],
          "Salepur": ["Nischintakoili", "Mahanga", "Tangi-Choudwar"]
        }
      }
    }
  },

  Assam: {
    code: "AS",
    lat: 26.2006,
    lon: 92.9376,
    districts: {
      Nagaon: {
        lat: 26.3464,
        lon: 92.6840,
        subDistricts: {
          "Nagaon": ["Raha", "Kaliabor", "Samaguri", "Dhing", "Rupahi"],
          "Hojai": ["Doboka", "Lanka", "Lumding", "Jugijan"]
        }
      },
      Kamrup: {
        lat: 26.3161,
        lon: 91.5984,
        subDistricts: {
          "Rangia": ["Boko", "Chaygaon", "Palasbari", "Hajo"],
          "Kamrup Metro": ["Sonapur", "Chandrapur", "Khetri", "Dimoria"]
        }
      }
    }
  },

  "Himachal Pradesh": {
    code: "HP",
    lat: 31.1048,
    lon: 77.1734,
    districts: {
      Shimla: {
        lat: 31.1048,
        lon: 77.1734,
        subDistricts: {
          "Rohru": ["Jubbal", "Kotkhai", "Chirgaon", "Tikkar"],
          "Theog": ["Kumarsain", "Narkanda", "Rampur", "Matiana"],
          "Shimla Rural": ["Sunni", "Mashobra", "Dhami", "Basantpur"]
        }
      },
      Kangra: {
        lat: 32.0998,
        lon: 76.2691,
        subDistricts: {
          "Palampur": ["Baijnath", "Bhawarna", "Maranda", "Panchrukhi"],
          "Kangra": ["Dharamshala", "Nagrota Bagwan", "Shahpur", "Rait"],
          "Nurpur": ["Jawali", "Fatehpur", "Indora", "Dehra Gopipur"]
        }
      }
    }
  },

  Uttarakhand: {
    code: "UK",
    lat: 30.0668,
    lon: 79.0193,
    districts: {
      "Udham Singh Nagar": {
        lat: 28.9800,
        lon: 79.4000,
        subDistricts: {
          "Kashipur": ["Jaspur", "Bazpur", "Mahukhera", "Kundeshwari"],
          "Rudrapur": ["Kichha", "Sitarganj", "Khatima", "Gadarpur"]
        }
      },
      Haridwar: {
        lat: 29.9457,
        lon: 78.1642,
        subDistricts: {
          "Roorkee": ["Laksar", "Bhagwanpur", "Manglaur", "Jhabrera"],
          "Haridwar": ["Bahadrabad", "Khanpur", "Dhandera"]
        }
      }
    }
  },

  Jharkhand: {
    code: "JH",
    lat: 23.6102,
    lon: 85.2799,
    districts: {
      Ranchi: {
        lat: 23.3441,
        lon: 85.3096,
        subDistricts: {
          "Kanke": ["BAU Kanke", "Nagri", "Ratu", "Ormanjhi", "Angara"],
          "Bundu": ["Tamar", "Sonahatu", "Silli", "Namkum"],
          "Mandar": ["Bero", "Itki", "Lapung", "Chanho", "Burmu"]
        }
      },
      Hazaribagh: {
        lat: 23.9961,
        lon: 85.3647,
        subDistricts: {
          "Hazaribagh": ["Barhi", "Barkagaon", "Ichak", "Chouparan"],
          "Vishnugarh": ["Katkamsandi", "Daru", "Chauparan"]
        }
      }
    }
  },

  Chhattisgarh: {
    code: "CG",
    lat: 21.2787,
    lon: 81.8661,
    districts: {
      Raipur: {
        lat: 21.2514,
        lon: 81.6296,
        subDistricts: {
          "Arang": ["Abhanpur", "Tilda Newra", "Kharora", "Mandir Hasaud"],
          "Dharsiwa": ["Birgaon", "Kurra", "Siltara", "Urla"]
        }
      },
      Durg: {
        lat: 21.1904,
        lon: 81.2849,
        subDistricts: {
          "Durg": ["Patan", "Dhamdha", "Bhilai", "Utai", "Kumhari"],
          "Bemetara border": ["Nandghat", "Berla", "Saja"]
        }
      }
    }
  }
};

// Helper: Get list of all states in India
export function getIndiaStates() {
  return Object.keys(INDIA_ADMIN_HIERARCHY);
}

// Helper: Get districts for a given state
export function getDistrictsForState(stateName) {
  const stateObj = INDIA_ADMIN_HIERARCHY[stateName];
  if (!stateObj || !stateObj.districts) return [];
  return Object.keys(stateObj.districts);
}

// Helper: Get sub-districts / tehsils for a given district
export function getSubDistricts(stateName, districtName) {
  const stateObj = INDIA_ADMIN_HIERARCHY[stateName];
  if (!stateObj || !stateObj.districts || !stateObj.districts[districtName]) return [];
  const distObj = stateObj.districts[districtName];
  return Object.keys(distObj.subDistricts || {});
}

// Helper: Get villages for a given sub-district
export function getVillages(stateName, districtName, subDistrictName) {
  const stateObj = INDIA_ADMIN_HIERARCHY[stateName];
  if (!stateObj || !stateObj.districts || !stateObj.districts[districtName]) return [];
  const distObj = stateObj.districts[districtName];
  if (!distObj.subDistricts || !distObj.subDistricts[subDistrictName]) return [];
  return distObj.subDistricts[subDistrictName] || [];
}

// Helper: Get precise coordinates for a district or state
export function getCoordinatesForLocation(stateName, districtName) {
  const stateObj = INDIA_ADMIN_HIERARCHY[stateName];
  if (!stateObj) {
    return { lat: 28.6139, lon: 77.2090, label: "New Delhi, India" };
  }
  if (districtName && stateObj.districts && stateObj.districts[districtName]) {
    const dist = stateObj.districts[districtName];
    return { lat: dist.lat, lon: dist.lon, label: `${districtName}, ${stateName}` };
  }
  return { lat: stateObj.lat, lon: stateObj.lon, label: stateName };
}
