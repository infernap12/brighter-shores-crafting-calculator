import {RecipeDto} from "@/services/api/types/dto.ts";
import {Profession} from "@/profession.ts";

export interface iRecipe {
	outputItem: string;
	outputQuantity: number;
	materials: {
		materialName: string;
		quantity: number;
	}[];
	facility: string;
	profession: Profession;
	levelRequired: number;
	duration: number;
	passive: boolean;
	xp: number;
	kp: number;
}

export class Recipe implements iRecipe {

	constructor(
		public outputItem: string,
		public outputQuantity: number,
		public materials: { materialName: string; quantity: number }[],
		public facility: string,
		public profession: Profession,
		public levelRequired: number,
		public duration: number,
		public passive: boolean,
		public xp: number = 0,
		public kp: number = 0,
	) {
	}

	static fromDto(recipeDto: RecipeDto): Recipe {
		return new Recipe(
			recipeDto.output[0].name,
			recipeDto.output[0].quantity,
			recipeDto.materials.map((item) => ({
				materialName: item.name,
				quantity: item.quantity

			})),
			recipeDto.facility,
			Profession[recipeDto.profession as keyof typeof Profession],
			recipeDto.level,
			recipeDto.duration,
			recipeDto.passive,
			recipeDto.xp ?? 0,
			recipeDto.kp ?? 0
		);
	}
}