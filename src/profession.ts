export enum Profession {
	Alchemist = 'Alchemist',
	Armorer = 'Armorer',
	Blacksmith = 'Blacksmith',
	Bonewright = 'Bonewright',
	Builder = 'Builder',
	Carpenter = 'Carpenter',
	Chef = 'Chef',
	Delver = 'Delver',
	Detective = 'Detective',
	Fisher = 'Fisher',
	Forager = 'Forager',
	Gatherer = 'Gatherer',
	Guard = 'Guard',
	Leatherworker = 'Leatherworker',
	Merchant = 'Merchant',
	Minefighter = 'Minefighter',
	Miner = 'Miner',
	Scout = 'Scout',
	Shieldbearer = 'Shieldbearer',
	Stonemason = 'Stonemason',
	Watchperson = 'Watchperson',
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
	[Profession.Blacksmith]: {outputCategory: 'Weapons'},
	[Profession.Bonewright]: {outputCategory: 'Weapons'},
	[Profession.Builder]: {outputCategory: 'Buildings?'}, // todo
	[Profession.Carpenter]: {outputCategory: 'posts?'}, // todo
	[Profession.Chef]: {outputCategory: 'Food?'}, // todo
	[Profession.Delver]: {outputCategory: 'worms?'}, //todo
	[Profession.Detective]: {outputCategory: 'Clues?'}, // todo
	[Profession.Fisher]: {outputCategory: 'Fish'}, // todo
	[Profession.Forager]: {outputCategory: 'Herbs'}, // todo
	[Profession.Gatherer]: {outputCategory: 'Resources'}, // todo
	[Profession.Guard]: {outputCategory: 'Protection'}, // todo
	[Profession.Merchant]: {outputCategory: 'Goods'}, // todo
	[Profession.Minefighter]: {outputCategory: 'Battle?'}, // todo
	[Profession.Miner]: {outputCategory: 'Ores'}, // todo
	[Profession.Scout]: {outputCategory: 'Information'}, // todo
	[Profession.Shieldbearer]: {outputCategory: 'Defense'}, // todo
	[Profession.Watchperson]: {outputCategory: 'Surveillance'}, // todo
	[Profession.Woodcutter]: {outputCategory: 'Lumber'}, // todo
	[Profession.Stonemason]: {outputCategory: 'Weapons'},
	[Profession.Leatherworker]: {outputCategory: 'Leather'},
} as const;

export interface ProfessionSetting {
	enabled: boolean;
	level: number;
}