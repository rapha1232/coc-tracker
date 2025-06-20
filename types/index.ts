// Many of these types are now available from coc-info. Use or extend coc-info types where possible.
// Example:
// import type { EntityType, ResourceType, GearUpData, DataStructure } from "coc-info";

export interface Main {
  tag: string;
  name: string;
  townHallLevel: number;
  townHallWeaponLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  builderHallLevel: number;
  builderBaseTrophies: number;
  bestBuilderBaseTrophies: number;
  role: string;
  warPreference: string;
  donations: number;
  donationsReceived: number;
  clanCapitalContributions: number;
  clan: Clan;
  league: League;
  builderBaseLeague: BuilderBaseLeague;
  achievements: Achievement[];
  playerHouse: PlayerHouse;
  labels: Label[];
  troops: Troop[]; // Consider: Troop extends coc-info type
  heroes: Hero[]; // Consider: Hero extends coc-info type
  heroEquipment: HeroEquipment[];
  spells: Spell[]; // Consider: Spell extends coc-info type
}

// Example extension:
// import type { Troop as CocInfoTroop } from "coc-info";
// export interface Troop extends CocInfoTroop { level: number; maxLevel: number; }

export interface Achievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo: null | string;
  village: Village;
}

export enum Village {
  BuilderBase = "builderBase",
  ClanCapital = "clanCapital",
  Home = "home",
}

export interface BuilderBaseLeague {
  id: number;
  name: string;
}

export interface Clan {
  tag: string;
  name: string;
  clanLevel: number;
  badgeUrls: BadgeUrls;
}

export interface BadgeUrls {
  small: string;
  large: string;
  medium: string;
}

export interface HeroEquipment {
  name: string;
  level: number;
  maxLevel: number;
  village: Village;
  equipment?: HeroEquipment[];
  superTroopIsActive?: boolean;
}

export interface Troop {
  name: string;
  level: number;
  maxLevel: number;
  village: Village;
  superTroopIsActive?: boolean;
}
export interface Spell {
  name: string;
  level: number;
  maxLevel: number;
  village: Village;
}
export interface Hero {
  name: string;
  level: number;
  maxLevel: number;
  village: Village;
  equipment?: HeroEquipment[];
}

export interface Label {
  id: number;
  name: string;
  iconUrls: LabelIconUrls;
}

export interface LabelIconUrls {
  small: string;
  medium: string;
}

export interface League {
  id: number;
  name: string;
  iconUrls: LeagueIconUrls;
}

export interface LeagueIconUrls {
  small: string;
  tiny: string;
  medium: string;
}

export interface PlayerHouse {
  elements: Element[];
}

export interface Element {
  type: string;
  id: number;
}

// src/types/progress.ts
export interface PlayerProgress {
  id?: number;
  playerTag: string;
  name: string;
  townHallLevel: number;
  townHallWeaponLevel?: number;
  lastUpdated: string;
}

export interface TroopProgress {
  id?: number;
  playerTag: string;
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

export interface ProgressData {
  player: PlayerProgress | null;
  troops: TroopProgress[];
}

export interface ProgressHistory {
  date: string;
  townHallLevel: number;
  totalTroops: number;
  maxedTroops: number;
}

import { Building as PrismaBuilding } from "@prisma/client";

export type BuildingCategory =
  | "defense"
  | "resource"
  | "army"
  | "trap"
  | "walls"
  | "other";

export interface Building extends PrismaBuilding {
  maxLevel: number;
  category: BuildingCategory;
}

export interface BuildingLevel {
  level: number;
  isGeared?: boolean;
}

export type BuildingLevels = Record<string, BuildingLevel[]>;
