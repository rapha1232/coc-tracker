export const TROOP_LEVELS_PER_TH =
{
    "Barbarian": {
      "tid": "TID_BARBARIAN",
      "id": 0,
      "name": "Barbarian",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 1,
        "cost": 100,
        "time": 10,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 1
      },
      "trainingTime": 5,
      "regenerationTimes": [],
      "dps": [8,11,14,18,23,26,30,34,38,42,45,48],
      "upgrade": {
        "cost": [10000,50000,130000,300000,800000,1000000,1500000,2500000,4300000,6000000,8000000],
        "time": [1800,3600,7200,14400,28800,43200,86400,172800,273600,345600,432000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [1,1,2,2,3,3,4,5,6,7,8,9,9,10,11,12,12]
    },
    "Archer": {
      "tid": "TID_ARCHER",
      "id": 1,
      "name": "Archer",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 2,
        "cost": 500,
        "time": 15,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 2
      },
      "trainingTime": 6,
      "regenerationTimes": [],
      "dps": [7,9,12,16,20,22,25,28,31,34,37,40,43],
      "upgrade": {
        "cost": [20000,80000,200000,500000,1000000,1500000,2300000,3000000,4500000,6500000,9000000,17500000],
        "time": [3600,7200,10800,28800,43200,86400,129600,216000,302400,388800,475200,1123200],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,1,2,2,3,3,4,5,6,7,8,9,9,10,11,12,13]
    },
    "Goblin": {
      "tid": "TID_GOBLIN",
      "id": 2,
      "name": "Goblin",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 2,
        "cost": 5000,
        "time": 1800,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 4
      },
      "trainingTime": 7,
      "regenerationTimes": [],
      "dps": [11,14,19,24,32,42,52,62,72],
      "upgrade": {
        "cost": [45000,100000,500000,700000,1600000,2200000,3700000,8000000],
        "time": [7200,10800,21600,43200,86400,129600,259200,475200],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,1,2,2,3,3,4,5,6,7,7,8,8,8,9,9,9]
    },
    "Giant": {
      "tid": "TID_GIANT",
      "id": 3,
      "name": "Giant",
      "housingSpace": 5,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 2,
        "cost": 2500,
        "time": 120,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 3
      },
      "trainingTime": 30,
      "regenerationTimes": [],
      "dps": [11,14,19,24,31,43,55,62,70,78,86,94,102],
      "upgrade": {
        "cost": [40000,150000,400000,800000,1500000,2300000,2600000,3400000,5000000,7500000,10000000,18500000],
        "time": [7200,14400,21600,43200,86400,129600,172800,237600,345600,432000,518400,1166400],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,1,1,2,2,3,4,5,6,7,8,9,10,10,11,12,13]
    },
    "Wall Breaker": {
      "tid": "TID_WALL_BREAKER",
      "id": 4,
      "name": "Wall Breaker",
      "housingSpace": 2,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 3,
        "cost": 20000,
        "time": 7200,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 5
      },
      "trainingTime": 15,
      "regenerationTimes": [],
      "dps": [6,10,15,20,43,55,66,75,86,94,102,110,118],
      "upgrade": {
        "cost": [80000,200000,450000,1000000,2400000,2800000,3800000,5200000,6500000,9500000,11000000,20000000],
        "time": [10800,14400,43200,57600,108000,172800,259200,345600,518400,561600,604800,1209600],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,1,2,2,3,4,5,5,6,7,8,9,10,11,12,13]
    },
    "Balloon": {
      "tid": "TID_GOBLIN_BALLOON",
      "id": 5,
      "name": "Balloon",
      "housingSpace": 5,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 4,
        "cost": 120000,
        "time": 14400,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 6
      },
      "trainingTime": 30,
      "regenerationTimes": [],
      "dps": [25,32,48,72,108,162,198,236,256,276,290],
      "upgrade": {
        "cost": [100000,400000,720000,1300000,2750000,4400000,5000000,7000000,10000000,14000000],
        "time": [14400,21600,64800,86400,259200,302400,345600,432000,648000,734400],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,2,2,3,4,5,6,6,7,8,9,10,10,11,11]
    },
    "Wizard": {
      "tid": "TID_WIZARD",
      "id": 6,
      "name": "Wizard",
      "housingSpace": 4,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 5,
        "cost": 270000,
        "time": 21600,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 7
      },
      "trainingTime": 30,
      "regenerationTimes": [],
      "dps": [50,70,90,125,170,185,200,215,230,245,260,275,290],
      "upgrade": {
        "cost": [120000,300000,600000,1200000,2000000,2500000,3100000,4000000,5500000,10000000,11500000,21000000],
        "time": [14400,18000,43200,64800,129600,172800,216000,259200,345600,583200,604800,1209600],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,2,3,4,5,6,7,8,9,10,10,11,12,13]
    },
    "Healer": {
      "tid": "TID_HEALER",
      "id": 7,
      "name": "Healer",
      "housingSpace": 14,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 6,
        "cost": 600000,
        "time": 43200,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 8
      },
      "trainingTime": 120,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [450000,900000,2500000,4000000,6000000,9500000,11000000,13000000,22500000],
        "time": [43200,86400,172800,259200,388800,604800,648000,691200,1296000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,1,2,3,4,4,5,5,6,7,8,9,10]
    },
    "Dragon": {
      "tid": "TID_DRAGON",
      "id": 8,
      "name": "Dragon",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 7,
        "cost": 1000000,
        "time": 86400,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 9
      },
      "trainingTime": 170,
      "regenerationTimes": [],
      "dps": [140,160,180,210,240,270,310,330,350,370,390,410],
      "upgrade": {
        "cost": [1000000,2000000,3000000,3800000,4900000,5000000,7500000,10500000,12000000,14000000,22000000],
        "time": [64800,129600,259200,302400,345600,432000,518400,604800,691200,734400,1267200],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,2,3,4,5,6,7,8,9,10,11,12]
    },
    "P.E.K.K.A": {
      "tid": "TID_PEKKA",
      "id": 9,
      "name": "P.E.K.K.A",
      "housingSpace": 25,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 8,
        "cost": 1400000,
        "time": 129600,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 10
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [260,290,320,360,410,470,540,610,680,750,810,870],
      "upgrade": {
        "cost": [600000,1300000,2000000,2100000,2500000,4500000,5000000,5800000,10500000,12000000,22000000],
        "time": [43200,86400,129600,144000,172800,259200,302400,388800,604800,626400,1252800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,3,4,6,7,8,9,9,10,11,12]
    },
    "Minion": {
      "tid": "TID_GARGOYLE",
      "id": 10,
      "name": "Minion",
      "housingSpace": 2,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 7,
        "cost": 200000,
        "time": 28800,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 1
      },
      "trainingTime": 16,
      "regenerationTimes": [],
      "dps": [38,41,44,47,50,54,58,62,66,70,74,78,82],
      "upgrade": {
        "cost": [1000,2500,5000,10000,15000,31500,47500,75000,100000,115000,160000,255000],
        "time": [21600,28800,43200,86400,129600,151200,216000,302400,432000,475200,561600,1209600],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,2,4,5,6,7,8,9,10,11,12,13]
    },
    "Hog Rider": {
      "tid": "TID_BOARRIDER",
      "id": 11,
      "name": "Hog Rider",
      "housingSpace": 5,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 7,
        "cost": 600000,
        "time": 86400,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 2
      },
      "trainingTime": 42,
      "regenerationTimes": [],
      "dps": [60,70,80,92,105,118,140,155,165,176,187,200,213,225],
      "upgrade": {
        "cost": [2000,3500,5000,10000,18500,35000,47500,50000,85000,107500,125000,175000,280000],
        "time": [36000,64800,86400,172800,194400,216000,259200,324000,367200,518400,540000,648000,1252800],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,2,4,5,6,7,9,10,11,12,13,14]
    },
    "Valkyrie": {
      "tid": "TID_WARRIORGIRL",
      "id": 12,
      "name": "Valkyrie",
      "housingSpace": 8,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 8,
        "cost": 1000000,
        "time": 129600,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 3
      },
      "trainingTime": 70,
      "regenerationTimes": [],
      "dps": [94,106,119,133,148,167,185,196,208,223,238],
      "upgrade": {
        "cost": [3000,5000,10000,16000,31500,55000,77500,105000,120000,170000],
        "time": [28800,86400,129600,172800,194400,237600,324000,518400,540000,583200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,2,4,5,6,7,8,9,10,11,11]
    },
    "Golem": {
      "tid": "TID_GOLEM",
      "id": 13,
      "name": "Golem",
      "housingSpace": 30,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 8,
        "cost": 1600000,
        "time": 172800,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 4
      },
      "trainingTime": 260,
      "regenerationTimes": [],
      "dps": [35,40,45,50,55,60,65,70,75,80,85,90,95,100],
      "upgrade": {
        "cost": [4000,6000,10000,18500,26500,38500,50000,62500,80000,105000,122500,175000,270000],
        "time": [57600,172800,194400,216000,244800,259200,302400,324000,367200,518400,540000,648000,1209600],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,2,4,5,7,9,10,11,12,13,14]
    },
    "Witch": {
      "tid": "TID_WARLOCK",
      "id": 15,
      "name": "Witch",
      "housingSpace": 12,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 9,
        "cost": 2200000,
        "time": 216000,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 5
      },
      "trainingTime": 100,
      "regenerationTimes": [],
      "dps": [100,110,140,165,185,200,220],
      "upgrade": {
        "cost": [20000,29000,45000,62500,150000,180000],
        "time": [172800,259200,345600,388800,604800,734400],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,2,3,4,5,5,5,6,7,7]
    },
    "Lava Hound": {
      "tid": "TID_AD_SEEKER",
      "id": 17,
      "name": "Lava Hound",
      "housingSpace": 30,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 9,
        "cost": 2900000,
        "time": 259200,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 6
      },
      "trainingTime": 260,
      "regenerationTimes": [],
      "dps": [10,12,14,16,18,20],
      "upgrade": {
        "cost": [14000,21500,42500,60000,80000],
        "time": [172800,216000,259200,345600,604800],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,2,3,4,5,6,6,6,6,6]
    },
    "Bowler": {
      "tid": "TID_BOWLER",
      "id": 22,
      "name": "Bowler",
      "housingSpace": 6,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 10,
        "cost": 4000000,
        "time": 432000,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 7
      },
      "trainingTime": 50,
      "regenerationTimes": [],
      "dps": [60,72,84,96,102,108,114,126,136],
      "upgrade": {
        "cost": [32500,44000,62500,85000,110000,145000,175000,280000],
        "time": [172800,216000,273600,410400,540000,648000,734400,1296000],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,2,3,4,5,6,7,8,9]
    },
    "Baby Dragon": {
      "tid": "TID_BABY_DRAGON",
      "id": 23,
      "name": "Baby Dragon",
      "housingSpace": 10,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 9,
        "cost": 2600000,
        "time": 172800,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 11
      },
      "trainingTime": 85,
      "regenerationTimes": [],
      "dps": [75,85,95,105,115,125,135,145,155,165,175],
      "upgrade": {
        "cost": [1500000,2000000,2800000,3700000,4800000,6200000,9500000,11000000,13500000,22500000],
        "time": [108000,129600,172800,259200,345600,410400,604800,648000,691200,1296000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,2,4,5,6,7,8,9,10,11]
    },
    "Miner": {
      "tid": "TID_MINER",
      "id": 24,
      "name": "Miner",
      "housingSpace": 6,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 10,
        "cost": 3700000,
        "time": 345600,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 12
      },
      "trainingTime": 30,
      "regenerationTimes": [],
      "dps": [80,88,96,104,112,120,128,136,144,152,160],
      "upgrade": {
        "cost": [1500000,2600000,3000000,4000000,4800000,6000000,8600000,10500000,12500000,21500000],
        "time": [86400,172800,216000,259200,345600,388800,540000,604800,648000,1252800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,3,5,6,7,8,9,10,11]
    },
    "Wall Wrecker": {
      "tid": "TID_SIEGE_MACHINE_RAM",
      "id": 51,
      "name": "Wall Wrecker",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "siege",
      "unlock": {
        "hall": 12,
        "cost": 2400000,
        "time": 172800,
        "resource": "Elixir",
        "building": "Workshop",
        "buildingLevel": 1
      },
      "trainingTime": 1200,
      "regenerationTimes": [],
      "dps": [250,300,350,400,450],
      "upgrade": {
        "cost": [2500000,3500000,6500000,10000000],
        "time": [172800,259200,604800,777600],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,3,4,4,5,5,5]
    },
    "Battle Blimp": {
      "tid": "TID_SIEGE_MACHINE_FLYER",
      "id": 52,
      "name": "Battle Blimp",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "siege",
      "unlock": {
        "hall": 12,
        "cost": 3700000,
        "time": 259200,
        "resource": "Elixir",
        "building": "Workshop",
        "buildingLevel": 2
      },
      "trainingTime": 1200,
      "regenerationTimes": [],
      "dps": [100,140,180,220],
      "upgrade": {
        "cost": [2500000,3500000,6500000],
        "time": [172800,259200,604800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,3,4,4,4,4,4]
    },
    "Yeti": {
      "tid": "TID_CHARACTER_YETI",
      "id": 53,
      "name": "Yeti",
      "housingSpace": 18,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 12,
        "cost": 7000000,
        "time": 604800,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 14
      },
      "trainingTime": 150,
      "regenerationTimes": [],
      "dps": [230,250,270,290,310,330,350],
      "upgrade": {
        "cost": [5000000,6500000,10000000,12000000,14500000,22500000],
        "time": [345600,432000,648000,691200,777600,1296000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,2,3,4,5,6,7]
    },
    "Electro Dragon": {
      "tid": "TID_LIGHTNINGDRAGON",
      "id": 59,
      "name": "Electro Dragon",
      "housingSpace": 30,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 11,
        "cost": 6000000,
        "time": 432000,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 13
      },
      "trainingTime": 260,
      "regenerationTimes": [],
      "dps": [240,270,300,330,360,390,420,450],
      "upgrade": {
        "cost": [6000000,7000000,9000000,11000000,14000000,16000000,23000000],
        "time": [388800,475200,604800,691200,777600,864000,1296000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,2,3,4,5,6,7,8]
    },
    "Stone Slammer": {
      "tid": "TID_SIEGE_MACHINE_BALLOON",
      "id": 62,
      "name": "Stone Slammer",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "siege",
      "unlock": {
        "hall": 12,
        "cost": 5000000,
        "time": 345600,
        "resource": "Elixir",
        "building": "Workshop",
        "buildingLevel": 3
      },
      "trainingTime": 1200,
      "regenerationTimes": [],
      "dps": [400,500,600,700,750],
      "upgrade": {
        "cost": [2500000,3500000,6500000,10000000],
        "time": [172800,259200,604800,777600],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,3,4,4,5,5,5]
    },
    "Dragon Rider": {
      "tid": "TID_CHARACTER_MECHA_DRAGON",
      "id": 65,
      "name": "Dragon Rider",
      "housingSpace": 25,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 13,
        "cost": 9000000,
        "time": 619200,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 15
      },
      "trainingTime": 210,
      "regenerationTimes": [],
      "dps": [340,370,400,430,460],
      "upgrade": {
        "cost": [7500000,12000000,14500000,22500000],
        "time": [604800,734400,777600,1339200],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,2,3,3,4,5]
    },
    "Siege Barracks": {
      "tid": "TID_SIEGE_MACHINE_CARRIER",
      "id": 75,
      "name": "Siege Barracks",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "siege",
      "unlock": {
        "hall": 13,
        "cost": 8700000,
        "time": 604800,
        "resource": "Elixir",
        "building": "Workshop",
        "buildingLevel": 4
      },
      "trainingTime": 1200,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [3500000,5000000,8000000,18000000],
        "time": [259200,345600,604800,1036800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,5,5]
    },
    "Headhunter": {
      "tid": "TID_CHARACTER_HEADHUNTER",
      "id": 82,
      "name": "Headhunter",
      "housingSpace": 6,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 12,
        "cost": 7200000,
        "time": 604800,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 9
      },
      "trainingTime": 50,
      "regenerationTimes": [],
      "dps": [105,115,125],
      "upgrade": {
        "cost": [57500,90000],
        "time": [432000,604800],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,2,3,3,3,3,3]
    },
    "Log Launcher": {
      "tid": "TID_SIEGE_MACHINE_LOG_LAUNCHER",
      "id": 87,
      "name": "Log Launcher",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "siege",
      "unlock": {
        "hall": 13,
        "cost": 9000000,
        "time": 626400,
        "resource": "Elixir",
        "building": "Workshop",
        "buildingLevel": 5
      },
      "trainingTime": 1200,
      "regenerationTimes": [],
      "dps": [140,160,180,200,220],
      "upgrade": {
        "cost": [3200000,4500000,7500000,18000000],
        "time": [259200,345600,604800,1036800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,5,5]
    },
    "Flame Flinger": {
      "tid": "TID_CHARACTER_SIEGE_MACHINE_CATAPULT",
      "id": 91,
      "name": "Flame Flinger",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "siege",
      "unlock": {
        "hall": 14,
        "cost": 10000000,
        "time": 648000,
        "resource": "Elixir",
        "building": "Workshop",
        "buildingLevel": 6
      },
      "trainingTime": 1200,
      "regenerationTimes": [],
      "dps": [45,50,55,60,65],
      "upgrade": {
        "cost": [5500000,8000000,10000000,18000000],
        "time": [259200,345600,604800,1036800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,5,5]
    },
    "Battle Drill": {
      "tid": "TID_CHARACTER_SIEGE_BATTLE_DRILL",
      "id": 92,
      "name": "Battle Drill",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "siege",
      "unlock": {
        "hall": 15,
        "cost": 11000000,
        "time": 669600,
        "resource": "Elixir",
        "building": "Workshop",
        "buildingLevel": 7
      },
      "trainingTime": 1200,
      "regenerationTimes": [],
      "dps": [430,470,510,550,590],
      "upgrade": {
        "cost": [6000000,8500000,10000000,19000000],
        "time": [345600,432000,691200,1166400],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,5]
    },
    "Electro Titan": {
      "tid": "TID_CHARACTER_ELECTRO_TITAN",
      "id": 95,
      "name": "Electro Titan",
      "housingSpace": 32,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 14,
        "cost": 11000000,
        "time": 691200,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 16
      },
      "trainingTime": 270,
      "regenerationTimes": [],
      "dps": [180,200,220,240],
      "upgrade": {
        "cost": [14000000,16000000,18500000],
        "time": [777600,907200,1036800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,4]
    },
    "Apprentice Warden": {
      "tid": "TID_CHARACTER_APPRENTICE_WARDEN",
      "id": 97,
      "name": "Apprentice Warden",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 13,
        "cost": 10000000,
        "time": 691200,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 10
      },
      "trainingTime": 170,
      "regenerationTimes": [],
      "dps": [170,185,200,215],
      "upgrade": {
        "cost": [90000,135000,160000],
        "time": [518400,648000,756000],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,4,4]
    },
    "Root Rider": {
      "tid": "TID_CHARACTER_TREANT",
      "id": 110,
      "name": "Root Rider",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 15,
        "cost": 12600000,
        "time": 777600,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 17
      },
      "trainingTime": 170,
      "regenerationTimes": [],
      "dps": [95,105,115],
      "upgrade": {
        "cost": [15000000,17600000],
        "time": [864000,1036800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,3]
    },
    "Druid": {
      "tid": "TID_CHARACTER_SHAPESHIFTER_DRUID",
      "id": 123,
      "name": "Druid",
      "housingSpace": 16,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 14,
        "cost": 12000000,
        "time": 777600,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 11
      },
      "trainingTime": 140,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [125000,175000,187500],
        "time": [777600,1036800,1123200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,4]
    },
    "Thrower": {
      "tid": "TID_CHARACTER_THROWER",
      "id": 132,
      "name": "Thrower",
      "housingSpace": 16,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 16,
        "cost": 15000000,
        "time": 950400,
        "resource": "Elixir",
        "building": "Barracks",
        "buildingLevel": 18
      },
      "trainingTime": 140,
      "regenerationTimes": [],
      "dps": [180,190,200],
      "upgrade": {
        "cost": [21000000,23000000],
        "time": [1209600,1382400],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3]
    },
    "Troop Launcher": {
      "tid": "TID_CHARACTER_SIEGE_MACHINE_TROOP_CATAPULT",
      "id": 115,
      "name": "Troop Launcher",
      "housingSpace": 1,
      "village": "home",
      "category": "troop",
      "subCategory": "siege",
      "unlock": {
        "hall": 16,
        "cost": 13000000,
        "time": 691200,
        "resource": "Elixir",
        "building": "Workshop",
        "buildingLevel": 8
      },
      "trainingTime": 1200,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [8500000,10000000,19000000],
        "time": [518400,777600,1166400],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4]
    },
    "Furnace": {
      "tid": "TID_CHARACTER_FURNACE",
      "id": 150,
      "name": "Furnace",
      "housingSpace": 18,
      "village": "home",
      "category": "troop",
      "subCategory": "troop",
      "unlock": {
        "hall": 15,
        "cost": 20000000,
        "time": 1036800,
        "resource": "Elixir",
        "building": "Dark Barracks",
        "buildingLevel": 12
      },
      "trainingTime": 150,
      "regenerationTimes": [],
      "dps": [1,2,3,4],
      "upgrade": {
        "cost": [200000,260000,320000],
        "time": [1036800,1209600,1382400],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4]
    },
    "Lightning Spell": {
      "tid": "TID_LIGHTNING_STORM",
      "id": 0,
      "name": "Lightning Spell",
      "housingSpace": 1,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 5,
        "cost": 150000,
        "time": 21600,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 1
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [50000,100000,200000,600000,1500000,2500000,4200000,6300000,10000000,13500000,18500000],
        "time": [7200,14400,21600,86400,129600,259200,302400,432000,604800,691200,1209600],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,4,4,4,5,6,7,8,9,9,9,10,11,12]
    },
    "Healing Spell": {
      "tid": "TID_HEALING_WAVE",
      "id": 1,
      "name": "Healing Spell",
      "housingSpace": 2,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 6,
        "cost": 300000,
        "time": 43200,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 2
      },
      "trainingTime": 360,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [75000,150000,300000,900000,1800000,3000000,6000000,11000000,14000000,19000000],
        "time": [10800,21600,43200,86400,129600,259200,432000,604800,691200,1296000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,3,4,5,6,7,7,7,8,8,9,10,11]
    },
    "Rage Spell": {
      "tid": "TID_HASTE",
      "id": 2,
      "name": "Rage Spell",
      "housingSpace": 2,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 7,
        "cost": 600000,
        "time": 86400,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 3
      },
      "trainingTime": 360,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [400000,800000,1000000,2000000,5000000],
        "time": [21600,43200,86400,172800,345600],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,4,5,5,5,5,6,6,6,6,6,6]
    },
    "Jump Spell": {
      "tid": "TID_JUMP_SPELL",
      "id": 3,
      "name": "Jump Spell",
      "housingSpace": 2,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 9,
        "cost": 1200000,
        "time": 172800,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 4
      },
      "trainingTime": 360,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [1000000,2000000,5000000,8000000],
        "time": [86400,172800,345600,561600],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,2,3,3,3,4,4,5,5,5]
    },
    "Freeze Spell": {
      "tid": "TID_FREEZE_SPELL",
      "id": 5,
      "name": "Freeze Spell",
      "housingSpace": 1,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 9,
        "cost": 1200000,
        "time": 172800,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 4
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [1200000,1700000,3000000,4200000,6000000,7000000],
        "time": [86400,129600,172800,216000,302400,432000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,2,5,6,7,7,7,7,7,7]
    },
    "Poison Spell": {
      "tid": "TID_POISON_CLOUD",
      "id": 9,
      "name": "Poison Spell",
      "housingSpace": 1,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 8,
        "cost": 130000,
        "time": 21600,
        "resource": "Elixir",
        "building": "Dark Spell Factory",
        "buildingLevel": 1
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [5000,10000,21500,35000,55000,77500,100000,135000,175000,280000],
        "time": [21600,64800,172800,259200,345600,432000,604800,691200,777600,1252800],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,2,3,4,5,6,7,8,9,10,11]
    },
    "Earthquake Spell": {
      "tid": "TID_EARTHQUAKE",
      "id": 10,
      "name": "Earthquake Spell",
      "housingSpace": 1,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 8,
        "cost": 260000,
        "time": 43200,
        "resource": "Elixir",
        "building": "Dark Spell Factory",
        "buildingLevel": 2
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [6000,12000,25500,42000],
        "time": [43200,86400,259200,302400],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,2,3,4,5,5,5,5,5,5,5]
    },
    "Haste Spell": {
      "tid": "TID_SPEEDUP",
      "id": 11,
      "name": "Haste Spell",
      "housingSpace": 1,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 9,
        "cost": 600000,
        "time": 172800,
        "resource": "Elixir",
        "building": "Dark Spell Factory",
        "buildingLevel": 3
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [8000,17000,30000,38500,200000],
        "time": [86400,172800,259200,345600,1080000],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,2,4,5,5,5,5,5,5,6]
    },
    "Clone Spell": {
      "tid": "TID_DUPLICATE_SPELL",
      "id": 16,
      "name": "Clone Spell",
      "housingSpace": 3,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 10,
        "cost": 2000000,
        "time": 259200,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 5
      },
      "trainingTime": 540,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [1500000,2500000,3000000,4000000,5000000,8000000,9000000],
        "time": [86400,172800,194400,216000,345600,432000,604800],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,3,5,5,6,7,8,8,8]
    },
    "Skeleton Spell": {
      "tid": "TID_CREATE_SKELETONS_SPELL",
      "id": 17,
      "name": "Skeleton Spell",
      "housingSpace": 1,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 9,
        "cost": 1200000,
        "time": 259200,
        "resource": "Elixir",
        "building": "Dark Spell Factory",
        "buildingLevel": 4
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [11000,17000,25000,40000,50000,75000,135000],
        "time": [86400,129600,194400,259200,345600,432000,619200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,1,3,4,6,7,7,8,8,8]
    },
    "Bat Spell": {
      "tid": "TID_SPELL_BATS",
      "id": 28,
      "name": "Bat Spell",
      "housingSpace": 1,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 10,
        "cost": 2500000,
        "time": 432000,
        "resource": "Elixir",
        "building": "Dark Spell Factory",
        "buildingLevel": 5
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [13000,25500,35000,47500,140000,260000],
        "time": [86400,172800,194400,345600,619200,1123200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,3,4,5,5,5,6,6,7]
    },
    "Invisibility Spell": {
      "tid": "TID_INVISIBILITY_SPELL",
      "id": 35,
      "name": "Invisibility Spell",
      "housingSpace": 1,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 11,
        "cost": 3500000,
        "time": 432000,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 6
      },
      "trainingTime": 180,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [5000000,6000000,7000000],
        "time": [259200,345600,432000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,2,3,4,4,4,4,4]
    },
    "Recall Spell": {
      "tid": "TID_SPELL_RECALL",
      "id": 53,
      "name": "Recall Spell",
      "housingSpace": 2,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 13,
        "cost": 9000000,
        "time": 604800,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 7
      },
      "trainingTime": 360,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [7500000,8000000,9000000,13000000,21000000],
        "time": [604800,777600,950400,1123200,1296000],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,5,6]
    },
    "Overgrowth Spell": {
      "tid": "TID_SPELL_OVERGROWTH",
      "id": 70,
      "name": "Overgrowth Spell",
      "housingSpace": 2,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 12,
        "cost": 4000000,
        "time": 518400,
        "resource": "Elixir",
        "building": "Dark Spell Factory",
        "buildingLevel": 6
      },
      "trainingTime": 360,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [62500,125000,175000],
        "time": [475200,777600,950400],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,2,2,3,3,4,4]
    },
    "Revive Spell": {
      "tid": "TID_SPELL_REVIVE",
      "id": 98,
      "name": "Revive Spell",
      "housingSpace": 2,
      "village": "home",
      "category": "spell",
      "subCategory": "spell",
      "unlock": {
        "hall": 15,
        "cost": 14000000,
        "time": 691200,
        "resource": "Elixir",
        "building": "Spell Factory",
        "buildingLevel": 8
      },
      "trainingTime": 360,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [18000000,20000000,22000000],
        "time": [864000,1209600,1382400],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4]
    },
    "Barbarian King": {
      "tid": "TID_BARBARIAN_KING",
      "id": 0,
      "name": "Barbarian King",
      "housingSpace": 25,
      "village": "home",
      "category": "hero",
      "subCategory": "hero",
      "unlock": {
        "hall": 7,
        "cost": 0,
        "time": 0,
        "resource": "Dark Elixir",
        "building": "Barbarian King",
        "buildingLevel": 1
      },
      "resourceType": "Elixir",
      "trainingTime": 0,
      "regenerationTimes": [600,600,600,600,720,720,720,720,720,840,840,840,840,840,960,960,960,960,960,1080,1080,1080,1080,1080,1200,1200,1200,1200,1200,1320,1320,1320,1320,1320,1440,1440,1440,1440,1440,1560,1560,1560,1560,1560,1680,1680,1680,1680,1680,1800,1800,1800,1800,1800,1920,1920,1920,1920,1920,2040,2040,2040,2040,2040,2160,2160,2160,2160,2160,2280,2280,2280,2280,2280,2400,2400,2400,2400,2400,2520,2520,2520,2520,2520,2640,2640,2640,2640,2640,2760,2760,2760,2760,2760,2880,2880,2880,2880,2880,2880],
      "dps": [102,104,105,108,110,112,115,116,119,122,124,127,129,132,134,137,139,143,145,148,151,154,157,161,164,167,170,173,177,181,184,188,192,196,200,203,207,212,216,220,234,239,244,249,254,259,265,270,276,282,288,294,300,307,314,320,327,334,341,349,355,362,370,377,385,393,400,408,417,425,434,442,451,459,468,475,483,490,498,506,513,519,526,533,540,547,553,560,567,574,581,587,594,601,608,615,622,629,636,643],
      "upgrade": {
        "cost": [5000,5500,6000,6500,7000,7500,8000,8500,10000,10500,11000,11500,12000,12500,13000,13500,14000,14500,15000,17000,19000,21000,23000,25000,27000,29000,31000,33000,35000,37000,39000,41000,43000,45000,47000,49000,51000,53000,55000,58000,61000,64000,67000,70000,73000,76000,79000,82000,85000,88000,91000,94000,97000,100000,103000,106000,109000,112000,115000,119000,123000,127000,131000,135000,139000,143000,147000,151000,155000,160000,165000,170000,175000,180000,185000,190000,195000,200000,205000,210000,215000,220000,225000,230000,240000,250000,260000,270000,280000,290000,300000,310000,320000,330000,340000,350000,360000,370000,380000],
        "time": [7200,14400,28800,36000,43200,50400,57600,64800,72000,79200,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,172800,172800,172800,172800,172800,216000,216000,216000,216000,216000,259200,259200,259200,259200,259200,302400,302400,302400,302400,302400,345600,345600,345600,345600,345600,432000,432000,432000,432000,432000,475200,475200,475200,475200,475200,496800,496800,496800,496800,496800,518400,518400,518400,518400,518400,561600,561600,561600,561600,561600,604800,604800,604800,604800,604800,648000,648000,648000,648000,648000,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,10,20,30,40,50,65,75,80,90,95,100]
    },
    "Archer Queen": {
      "tid": "TID_ARCHER_QUEEN",
      "id": 1,
      "name": "Archer Queen",
      "housingSpace": 25,
      "village": "home",
      "category": "hero",
      "subCategory": "hero",
      "unlock": {
        "hall": 8,
        "cost": 0,
        "time": 0,
        "resource": "Dark Elixir",
        "building": "Archer Queen",
        "buildingLevel": 1
      },
      "resourceType": "Elixir",
      "trainingTime": 0,
      "regenerationTimes": [600,600,600,600,720,720,720,720,720,840,840,840,840,840,960,960,960,960,960,1080,1080,1080,1080,1080,1200,1200,1200,1200,1200,1320,1320,1320,1320,1320,1440,1440,1440,1440,1440,1560,1560,1560,1560,1560,1680,1680,1680,1680,1680,1800,1800,1800,1800,1800,1920,1920,1920,1920,1920,2040,2040,2040,2040,2040,2160,2160,2160,2160,2160,2280,2280,2280,2280,2280,2400,2400,2400,2400,2400,2520,2520,2520,2520,2520,2640,2640,2640,2640,2640,2760,2760,2760,2760,2760,2880,2880,2880,2880,2880,2880],
      "dps": [136,139,143,146,150,154,157,162,165,169,173,178,183,187,192,196,201,207,212,217,223,228,234,240,246,252,258,264,271,278,285,292,299,307,315,322,331,338,347,356,365,374,383,393,403,413,423,434,445,456,465,474,485,495,505,515,526,537,548,559,570,581,593,605,617,628,638,648,656,664,671,677,682,687,692,697,701,706,710,714,717,721,724,728,731,734,738,741,745,748,751,755,758,762,765,768,771,774,777,780],
      "upgrade": {
        "cost": [5000,5500,6000,6500,7000,7500,8000,8500,10000,10500,11000,11500,12000,12500,13000,13500,14000,14500,15000,17000,19000,21000,23000,25000,27000,29000,31000,33000,35000,37000,39000,41000,43000,45000,47000,49000,51000,53000,55000,58000,61000,64000,67000,70000,73000,76000,79000,82000,85000,88000,91000,94000,97000,100000,103000,106000,109000,112000,115000,119000,123000,127000,131000,135000,139000,143000,147000,151000,155000,160000,165000,170000,175000,180000,185000,190000,195000,200000,205000,210000,215000,220000,225000,230000,240000,250000,260000,270000,280000,290000,300000,310000,320000,330000,340000,350000,360000,370000,380000],
        "time": [7200,14400,28800,36000,43200,50400,57600,64800,72000,79200,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,108000,172800,172800,172800,172800,172800,216000,216000,216000,216000,216000,259200,259200,259200,259200,259200,345600,345600,345600,345600,345600,432000,432000,432000,432000,432000,475200,475200,475200,475200,475200,496800,496800,496800,496800,496800,518400,518400,518400,518400,518400,561600,561600,561600,561600,561600,604800,604800,604800,604800,604800,648000,648000,648000,648000,648000,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,10,30,40,50,65,75,80,90,95,100]
    },
    "Grand Warden": {
      "tid": "TID_GRAND_WARDEN",
      "id": 2,
      "name": "Grand Warden",
      "housingSpace": 25,
      "village": "home",
      "category": "hero",
      "subCategory": "hero",
      "unlock": {
        "hall": 11,
        "cost": 0,
        "time": 0,
        "resource": "Elixir",
        "building": "Grand Warden",
        "buildingLevel": 1
      },
      "resourceType": "Elixir",
      "trainingTime": 0,
      "regenerationTimes": [1200,1200,1200,1200,1320,1320,1320,1320,1320,1440,1440,1440,1440,1440,1560,1560,1560,1560,1560,1680,1680,1680,1680,1680,1800,1800,1800,1800,1800,1920,1920,1920,1920,1920,2040,2040,2040,2040,2040,2160,2160,2160,2160,2160,2280,2280,2280,2280,2280,2400,2400,2400,2400,2400,2520,2520,2520,2520,2520,2640,2640,2640,2640,2640,2760,2760,2760,2760,2760,2820,2820,2820,2820,2820,2880],
      "dps": [43,44,46,48,49,51,54,56,59,61,64,66,70,73,77,80,83,87,90,94,98,102,106,111,116,121,126,131,137,143,149,155,162,168,175,183,190,198,207,215,221,226,230,234,237,241,244,247,251,254,258,261,264,268,271,274,276,279,281,284,286,289,292,294,297,299,302,304,307,309,312,315,318,321,324],
      "upgrade": {
        "cost": [1000000,1100000,1200000,1400000,1500000,1700000,1800000,2000000,2300000,2700000,3000000,3400000,3700000,4100000,4400000,4800000,5100000,5500000,6000000,6500000,6600000,6700000,6800000,6900000,7000000,7100000,7200000,7300000,7400000,7500000,7600000,7700000,7800000,7900000,8000000,8100000,8200000,8300000,8400000,8500000,8800000,9100000,9400000,9700000,10000000,10300000,10600000,11000000,11500000,12000000,12500000,13000000,13500000,14000000,14500000,15000000,15500000,16000000,16200000,16700000,16900000,17100000,17300000,17500000,18000000,18500000,19000000,19500000,20000000,20500000,21000000,21500000,22000000,22500000],
        "time": [7200,14400,28800,36000,43200,50400,57600,64800,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,129600,129600,129600,129600,129600,172800,172800,172800,172800,172800,216000,216000,216000,216000,216000,259200,259200,259200,259200,259200,345600,345600,345600,345600,345600,432000,432000,432000,432000,432000,518400,518400,518400,518400,518400,604800,604800,604800,604800,604800,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200],
        "resource": "Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,20,40,50,55,65,70,75]
    },
    "Royal Champion": {
      "tid": "TID_HERO_ROYAL_CHAMPION",
      "id": 4,
      "name": "Royal Champion",
      "housingSpace": 25,
      "village": "home",
      "category": "hero",
      "subCategory": "hero",
      "unlock": {
        "hall": 13,
        "cost": 0,
        "time": 0,
        "resource": "Dark Elixir",
        "building": "Royal Champion",
        "buildingLevel": 1
      },
      "resourceType": "Elixir",
      "trainingTime": 0,
      "regenerationTimes": [1800,1800,1800,1800,1920,1920,1920,1920,1920,2040,2040,2040,2040,2040,2160,2160,2160,2160,2160,2280,2280,2280,2280,2280,2400,2400,2400,2400,2400,2520,2520,2520,2520,2520,2640,2640,2640,2640,2640,2760,2760,2760,2760,2760,2880,2880,2880,2880,2880,2880],
      "dps": [340,350,360,370,375,380,385,390,396,402,408,414,420,426,432,438,444,448,452,456,460,465,470,474,477,480,483,486,489,492,495,498,502,506,510,514,518,522,526,530,533,536,539,542,545,548,551,554,557,560],
      "upgrade": {
        "cost": [10000,15000,20000,25000,30000,35000,40000,45000,50000,55000,60000,65000,70000,75000,80000,85000,90000,95000,100000,105000,110000,115000,120000,125000,130000,130000,135000,140000,145000,150000,155000,160000,170000,180000,190000,200000,210000,220000,230000,250000,270000,290000,310000,330000,340000,350000,360000,370000,380000],
        "time": [28800,43200,57600,72000,86400,129600,172800,172800,172800,172800,172800,259200,259200,259200,345600,345600,345600,345600,345600,432000,432000,432000,432000,432000,518400,518400,518400,518400,518400,604800,604800,604800,604800,604800,648000,648000,648000,648000,648000,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,25,30,40,45,50]
    },
    "Minion Prince": {
      "tid": "TID_MINION_HERO",
      "id": 6,
      "name": "Minion Prince",
      "housingSpace": 25,
      "village": "home",
      "category": "hero",
      "subCategory": "hero",
      "unlock": {
        "hall": 9,
        "cost": 0,
        "time": 0,
        "resource": "",
        "building": "",
        "buildingLevel": 0
      },
      "resourceType": "Elixir",
      "trainingTime": 0,
      "regenerationTimes": [1080,1080,1080,1080,1200,1200,1200,1200,1200,1320,1320,1320,1320,1320,1440,1440,1440,1440,1440,1560,1560,1560,1560,1560,1680,1680,1680,1680,1680,1800,1800,1800,1800,1800,1920,1920,1920,1920,1920,2040,2040,2040,2040,2040,2160,2160,2160,2160,2160,2280,2280,2280,2280,2280,2400,2400,2400,2400,2400,2520,2520,2520,2520,2520,2640,2640,2640,2640,2640,2760,2760,2760,2760,2760,2760,2760,2760,2760,2760,2880,2880,2880,2880,2880,2880,2880,2880,2880,2880,2880],
      "dps": [173,177,181,187,191,196,201,206,211,216,222,227,233,238,244,251,257,263,270,277,284,290,298,305,313,321,329,337,345,354,363,372,381,391,401,411,419,427,437,446,455,464,474,484,494,504,513,523,534,545,556,566,575,584,591,598,604,610,614,619,623,628,631,636,639,643,646,649,652,656,658,661,665,670,675,680,685,690,695,700,705,710,715,720,725,730,735,740,745,750],
      "upgrade": {
        "cost": [5000,5500,6000,6500,7000,7500,8000,8500,10000,10500,11000,11500,12000,12500,13000,13500,14000,14500,15000,17000,19000,21000,23000,25000,27000,29000,31000,33000,35000,37000,39000,41000,43000,45000,47000,49000,51000,53000,55000,60000,65000,70000,75000,80000,85000,90000,95000,100000,105000,110000,115000,120000,125000,130000,135000,140000,145000,150000,155000,160000,165000,170000,175000,180000,185000,190000,195000,200000,205000,210000,215000,220000,225000,230000,240000,250000,260000,270000,280000,290000,300000,310000,320000,330000,340000,350000,360000,370000,380000],
        "time": [7200,14400,28800,36000,43200,50400,57600,64800,72000,79200,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,86400,172800,172800,172800,172800,172800,216000,216000,216000,216000,216000,259200,259200,259200,259200,259200,345600,345600,345600,345600,345600,432000,432000,432000,432000,432000,518400,518400,518400,518400,518400,604800,604800,604800,604800,604800,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,10,20,30,40,50,60,70,80,90]
    },
    "L.A.S.S.I": {
      "tid": "TID_PET_MELEEJUMPER",
      "id": 0,
      "name": "L.A.S.S.I",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 14,
        "cost": 3000000,
        "time": 172800,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 1
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [150,160,170,180,190,200,210,220,230,240,250,260,270,280,290],
      "upgrade": {
        "cost": [20000,30000,40000,50000,60000,70000,80000,90000,100000,110000,120000,130000,140000,150000],
        "time": [86400,129600,172800,216000,259200,302400,345600,388800,432000,475200,518400,561600,604800,648000],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,10,15,15,15]
    },
    "Mighty Yak": {
      "tid": "TID_PET_WALLBUSTER",
      "id": 1,
      "name": "Mighty Yak",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 14,
        "cost": 5000000,
        "time": 302400,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 3
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [60,64,68,72,76,80,84,88,92,96,100,104,108,112,116],
      "upgrade": {
        "cost": [40000,50000,60000,70000,80000,90000,100000,110000,120000,130000,140000,150000,160000,170000],
        "time": [86400,129600,172800,216000,259200,302400,345600,388800,432000,475200,518400,561600,604800,648000],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,10,15,15,15]
    },
    "Electro Owl": {
      "tid": "TID_PET_RANGEDATTACKER",
      "id": 2,
      "name": "Electro Owl",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 14,
        "cost": 4000000,
        "time": 259200,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 2
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [100,105,110,115,120,125,130,135,140,145,150,155,160,165,170],
      "upgrade": {
        "cost": [30000,45000,60000,75000,90000,105000,120000,135000,150000,165000,180000,195000,210000,225000],
        "time": [129600,172800,259200,345600,388800,432000,511200,518400,561600,604800,691200,691200,691200,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,15,15]
    },
    "Unicorn": {
      "tid": "TID_PET_HEALER",
      "id": 3,
      "name": "Unicorn",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 14,
        "cost": 6000000,
        "time": 345600,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 4
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [],
      "upgrade": {
        "cost": [50000,65000,80000,95000,110000,125000,140000,155000,170000,200000,230000,260000,290000,320000],
        "time": [129600,172800,259200,345600,388800,432000,511200,518400,561600,604800,691200,691200,691200,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,15]
    },
    "Phoenix": {
      "tid": "TID_PET_PHOENIX",
      "id": 4,
      "name": "Phoenix",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 15,
        "cost": 10000000,
        "time": 604800,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 8
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [178,186,194,202,210,218,226,234,242,250],
      "upgrade": {
        "cost": [80000,95000,110000,125000,140000,155000,170000,180000,190000],
        "time": [129600,172800,259200,345600,388800,432000,511200,518400,561600],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10]
    },
    "Poison Lizard": {
      "tid": "TID_PET_POISON_LIZARD",
      "id": 7,
      "name": "Poison Lizard",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 15,
        "cost": 9000000,
        "time": 518400,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 7
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [181,192,203,214,225,236,247,258,269,280],
      "upgrade": {
        "cost": [60000,75000,90000,100000,110000,120000,130000,140000,150000],
        "time": [86400,129600,172800,216000,259200,302400,345600,388800,432000],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10]
    },
    "Diggy": {
      "tid": "TID_PET_DIGGY",
      "id": 8,
      "name": "Diggy",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 15,
        "cost": 8000000,
        "time": 475200,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 6
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [105,110,115,120,125,130,135,140,145,150],
      "upgrade": {
        "cost": [90000,105000,120000,130000,140000,150000,160000,170000,180000],
        "time": [129600,172800,259200,345600,388800,432000,511200,518400,561600],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10]
    },
    "Frosty": {
      "tid": "TID_PET_FROSTY",
      "id": 9,
      "name": "Frosty",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 15,
        "cost": 7000000,
        "time": 432000,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 5
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [94,98,102,106,110,114,118,122,126,130],
      "upgrade": {
        "cost": [70000,85000,100000,115000,130000,145000,160000,170000,180000],
        "time": [129600,172800,259200,345600,388800,432000,511200,518400,561600],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10]
    },
    "Spirit Fox": {
      "tid": "TID_PET_SPIRIT_FOX",
      "id": 10,
      "name": "Spirit Fox",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 16,
        "cost": 11000000,
        "time": 648000,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 9
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [108,116,124,132,140,148,156,164,172,180],
      "upgrade": {
        "cost": [150000,160000,170000,180000,190000,200000,210000,220000,230000],
        "time": [259200,345600,432000,475200,518400,561600,604800,648000,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10]
    },
    "Angry Jelly": {
      "tid": "TID_PET_ANGRY_JELLY",
      "id": 11,
      "name": "Angry Jelly",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 16,
        "cost": 12000000,
        "time": 691200,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 10
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [112,121,130,139,148,157,166,175,184,193],
      "upgrade": {
        "cost": [150000,160000,170000,180000,190000,200000,210000,220000,230000],
        "time": [259200,345600,432000,518400,604800,691200,691200,691200,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10]
    },
    "Sneezy": {
      "tid": "TID_PET_SNEEZY",
      "id": 16,
      "name": "Sneezy",
      "housingSpace": 20,
      "village": "home",
      "category": "troop",
      "subCategory": "pet",
      "unlock": {
        "hall": 17,
        "cost": 22000000,
        "time": 1339200,
        "resource": "Elixir",
        "building": "Pet House",
        "buildingLevel": 11
      },
      "resourceType": "Dark Elixir",
      "trainingTime": 0,
      "regenerationTimes": [],
      "dps": [270,290,310,330,350,370,390,410,430,450],
      "upgrade": {
        "cost": [200000,220000,240000,260000,280000,300000,320000,340000,360000],
        "time": [691200,691200,691200,691200,691200,691200,691200,691200,691200],
        "resource": "Dark Elixir",
        "resources": []
      },
      "allowedCharacters": [],
      "minLevel": 1,
      "seasonal": false,
      "levels": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10]
    }
  }