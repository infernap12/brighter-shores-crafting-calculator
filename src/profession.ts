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