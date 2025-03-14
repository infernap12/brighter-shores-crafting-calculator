export enum Profession {
	Alchemist = 'Alchemist',
	Armorer = 'Armorer',
	Blacksmith = 'Blacksmith',
	Bonewright = 'Bonewright',
	Builder = 'Builder',
	Carpenter = 'Carpenter',
	Combat = 'Combat',
	Chef = 'Chef',
	Delver = 'Delver',
	Detective = 'Detective',
	Fisher = 'Fisher',
	Forager = 'Forager',
	Gatherer = 'Gatherer',
	Leatherworker = 'Leatherworker',
	Merchant = 'Merchant',
	Miner = 'Miner',
	Stonemason = 'Stonemason',
	Woodcutter = 'Woodcutter'
}

export enum Faction {
	Cryoknight = "Cryoknight",
	Guardian = "Guardian",
	Hammermage = "Hammermage"
}

export type WeaponProfession
	= Profession.Stonemason
	| Profession.Blacksmith
	| Profession.Bonewright

export const professionProperties = {
	[Profession.Alchemist]: {outputCategory: 'Potions'},
	[Profession.Armorer]: {outputCategory: 'Armor'}, // todo
	[Profession.Blacksmith]: {outputCategory: 'Cryoknight Equipment'},
	[Profession.Bonewright]: {outputCategory: 'Guardian Equipment'},
	[Profession.Builder]: {outputCategory: 'Buildings?'}, // todo
	[Profession.Carpenter]: {outputCategory: 'posts?'}, // todo
	[Profession.Chef]: {outputCategory: 'Food'},
	[Profession.Delver]: {outputCategory: 'worms?'}, //todo
	[Profession.Detective]: {outputCategory: 'Clues?'}, // todo
	[Profession.Fisher]: {outputCategory: 'Fish'},
	[Profession.Forager]: {outputCategory: 'Herbs'}, // todo
	[Profession.Gatherer]: {outputCategory: 'Resources'}, // todo
	[Profession.Merchant]: {outputCategory: 'Goods'}, // todo
	[Profession.Miner]: {outputCategory: 'Ores'}, // todo
	[Profession.Woodcutter]: {outputCategory: 'Lumber'}, // todo
	[Profession.Stonemason]: {outputCategory: 'Hammermage Equipment'},
	[Profession.Leatherworker]: {outputCategory: 'Leather'},
} as const;

export interface ProfessionSetting {
	enabled: boolean;
	level: number;
}