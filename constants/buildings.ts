export interface Building {
  name: string;
  maxLevel: number;
  category: 'Defense' | 'Resource' | 'Army' | 'Trap' | 'Other' | 'Walls';
  count: number;
}

export interface Lab {
  name: string;
  maxLevel: number;
  category: 'Troops' | 'Spells' | 'Siege Machine';
  uses: 'Elixir' | 'Dark Elixir';
}

export interface Hero {
  name: string;
  maxLevel: number;
  category: 'Hero';
  uses: 'Elixir' | 'Dark Elixir';
}

export const TH13_BUILDINGS: Building[] = [
  { name: "Cannon", maxLevel: 19, category: "Defense", count: 7 },
  { name: "Archer Tower", maxLevel: 19, category: "Defense", count: 8 },
  { name: "Mortar", maxLevel: 13, category: "Defense", count: 4 },
  { name: "Air Defense", maxLevel: 11, category: "Defense", count: 4 },
  { name: "Wizard Tower", maxLevel: 13, category: "Defense", count: 5 },
  { name: "Air Sweeper", maxLevel: 7, category: "Defense", count: 2 },
  { name: "Hidden Tesla", maxLevel: 12, category: "Defense", count: 5 },
  { name: "Bomb Tower", maxLevel: 8, category: "Defense", count: 2 },
  { name: "X-Bow", maxLevel: 8, category: "Defense", count: 4 },
  { name: "Inferno Tower", maxLevel: 7, category: "Defense", count: 3 },
  { name: "Eagle Artillery", maxLevel: 4, category: "Defense", count: 1 },
  { name: "Scattershot", maxLevel: 2, category: "Defense", count: 2 },
  {name: "Giga Inferno", maxLevel: 5, category: "Defense", count: 1},
  
  // Resource Buildings
  { name: "Gold Mine", maxLevel: 15, category: "Resource", count: 7 },
  { name: "Elixir Collector", maxLevel: 15, category: "Resource", count: 7 },
  { name: "Dark Elixir Drill", maxLevel: 9, category: "Resource", count: 3 },
  { name: "Gold Storage", maxLevel: 14, category: "Resource", count: 4 },
  { name: "Elixir Storage", maxLevel: 14, category: "Resource", count: 4 },
  { name: "Dark Elixir Storage", maxLevel: 8, category: "Resource", count: 1 },
  
  // Army Buildings
  { name: "Army Camp", maxLevel: 11, category: "Army", count: 4 },
  { name: "Barracks", maxLevel: 15, category: "Army", count: 1 },
  { name: "Dark Barracks", maxLevel: 10, category: "Army", count: 1 },
  { name: "Spell Factory", maxLevel: 7, category: "Army", count: 1 },
  { name: "Dark Spell Factory", maxLevel: 5, category: "Army", count: 1 },
  { name: "Workshop", maxLevel: 5, category: "Army", count: 1 },
  { name: "Laboratory", maxLevel: 11, category: "Army", count: 1 },
  { name: "Blacksmith", maxLevel: 6, category: "Army", count: 1 },
  
  // Other Buildings
  { name: "Clan Castle", maxLevel: 9, category: "Other", count: 1 },
  { name: "Hero Hall", maxLevel: 7, category: "Other", count: 1 },
  { name: "Builder's Hut", maxLevel: 1, category: "Other", count: 5 },
  
  { name: "Wall", maxLevel: 14, category: "Walls", count: 300 },
  // Traps
  { name: "Bomb", maxLevel: 9, category: "Trap", count: 7 },
  { name: "Spring Trap", maxLevel: 5, category: "Trap", count: 9 },
  { name: "Giant Bomb", maxLevel: 7, category: "Trap", count: 6 },
  { name: "Air Bomb", maxLevel: 8, category: "Trap", count: 6 },
  { name: "Seeking Air Mine", maxLevel: 4, category: "Trap", count: 7 },
  { name: "Skeleton Trap", maxLevel: 4, category: "Trap", count: 3 },
  { name: "Tornado Trap", maxLevel: 3, category: "Trap", count: 1 }

]; 

export const TH13_LABS: Lab[] = [
  { name: "Barbarian", maxLevel: 9, category: "Troops", uses: "Elixir" },
  { name: "Archer", maxLevel: 9, category: "Troops", uses: "Elixir" },
  { name: "Giant", maxLevel: 10, category: "Troops", uses: "Elixir" },
  { name: "Goblin", maxLevel: 8, category: "Troops", uses: "Elixir" },
  { name: "Wall Breaker", maxLevel: 9, category: "Troops", uses: "Elixir" },
  { name: "Balloon", maxLevel: 9, category: "Troops", uses: "Elixir" },
  { name: "Wizard", maxLevel: 10, category: "Troops", uses: "Elixir" },
  { name: "Healer", maxLevel: 6, category: "Troops", uses: "Elixir" },
  { name: "Dragon", maxLevel: 8, category: "Troops", uses: "Elixir" },
  { name: "P.E.K.K.A", maxLevel: 9, category: "Troops", uses: "Elixir" },
  { name: "Baby Dragon", maxLevel: 7, category: "Troops", uses: "Elixir" },
  { name: "Miner", maxLevel: 7, category: "Troops", uses: "Elixir" },
  { name: "Electro Dragon", maxLevel: 4, category: "Troops", uses: "Elixir" },
  { name: "Yeti", maxLevel: 3, category: "Troops", uses: "Elixir" },
  { name: "Dragon Rider", maxLevel: 2, category: "Troops", uses: "Elixir" },
  { name: "Lightning Spell", maxLevel: 9, category: "Spells", uses: "Elixir" },
  { name: "Healing Spell", maxLevel: 8, category: "Spells", uses: "Elixir" },
  { name: "Rage Spell", maxLevel: 6, category: "Spells", uses: "Elixir" },
  { name: "Jump Spell", maxLevel: 4, category: "Spells", uses: "Elixir" },
  { name: "Freeze Spell", maxLevel: 7, category: "Spells", uses: "Elixir" },
  { name: "Clone Spell", maxLevel: 6, category: "Spells", uses: "Elixir" },
  { name: "Invisibility Spell", maxLevel: 4, category: "Spells", uses: "Elixir" },
  { name: "Recall Spell", maxLevel: 2, category: "Spells", uses: "Elixir" },
  { name: "Minion", maxLevel: 9, category: "Troops", uses: "Dark Elixir" },
  { name: "Hog Rider", maxLevel: 10, category: "Troops", uses: "Dark Elixir" },
  { name: "Valkyrie", maxLevel: 8, category: "Troops", uses: "Dark Elixir" },
  { name: "Golem", maxLevel: 10, category: "Troops", uses: "Dark Elixir" },
  { name: "Witch", maxLevel: 5, category: "Troops", uses: "Dark Elixir" },
  { name: "Lava Hound", maxLevel: 6, category: "Troops", uses: "Dark Elixir" },
  { name: "Bowler", maxLevel: 5, category: "Troops", uses: "Dark Elixir" },
  { name: "Ice Golem", maxLevel: 5, category: "Troops", uses: "Dark Elixir" },
  { name: "Headhunter", maxLevel: 3, category: "Troops", uses: "Dark Elixir" },
  { name: "Apprentice Warden", maxLevel: 2, category: "Troops", uses: "Dark Elixir" },
  { name: "Poison Spell", maxLevel: 7, category: "Spells", uses: "Dark Elixir" },
  { name: "Earthquake Spell", maxLevel: 5, category: "Spells", uses: "Dark Elixir" },
  { name: "Haste Spell", maxLevel: 5, category: "Spells", uses: "Dark Elixir" },
  { name: "Skeleton Spell", maxLevel: 7, category: "Spells", uses: "Dark Elixir" },
  { name: "Bat Spell", maxLevel: 5, category: "Spells", uses: "Dark Elixir" },
  { name: "Overgrowth Spell", maxLevel: 2, category: "Spells", uses: "Dark Elixir" },
  { name: "Wall Wrecker", maxLevel: 4, category: "Siege Machine", uses: "Elixir" },
  { name: "Battle Blimp", maxLevel: 4, category: "Siege Machine", uses: "Elixir" },
  { name: "Stone Slammer", maxLevel: 4, category: "Siege Machine", uses: "Elixir" },
  { name: "Siege Barracks", maxLevel: 4, category: "Siege Machine", uses: "Elixir" },
  { name: "Log Launcher", maxLevel: 4, category: "Siege Machine", uses: "Elixir" },
];

export const TH13_HEROES: Hero[] = [
  { name: "Barbarian King", maxLevel: 75, category: "Hero", uses: "Dark Elixir" },
  { name: "Archer Queen", maxLevel: 75, category: "Hero", uses: "Dark Elixir" },
  { name: "Grand Warden", maxLevel: 50, category: "Hero", uses: "Elixir" },
  { name: "Royal Champion", maxLevel: 25, category: "Hero", uses: "Dark Elixir" },
  { name: "Minion Prince", maxLevel: 50, category: "Hero", uses: "Dark Elixir" },
];
