export interface RecipeDto {
	kp?: number,
	xp?: number,
	output: DtoItem[],
	facility: string,
	materials: DtoItem[],
	profession: string,
	level: number,
	passive: boolean,
	duration: number
}

interface DtoItem {
	name: string,
	quantity: number
}

export interface ActivityDto {
	coop: boolean,
	kp: number,
	xp: number,
	output: DtoItem[],
	passive: boolean,
	materials: DtoItem[],
	profession: string,
	level: number,
	respawn: number,
	duration: number,
	tool: string
}