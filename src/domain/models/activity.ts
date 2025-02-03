import {Profession} from "@/profession.ts";
import {ActivityDto} from "@/services/api/types/dto.ts";

export interface iActivity {
	outputItem: string;
	outputQuantity: number;
	passive: boolean;
	coop: boolean;
	xp: number;
	kp: number;
	materials: {
		materialName: string;
		quantity: number;
	}[];
	profession: Profession;
	level: number;
	tool: string;
	duration: number;
}

export class Activity implements iActivity {
	constructor(
		public outputItem: string,
		public outputQuantity: number,
		public profession: Profession,
		public passive: boolean,
		public coop: boolean,
		public xp: number,
		public kp: number,
		public materials: { materialName: string; quantity: number }[],
		public level: number,
		public tool: string,
		public duration: number,
	) {
	}


	static fromDto(activityDto: ActivityDto) {
		return new Activity(
			activityDto.output[0].name,
			activityDto.output[0].quantity,
			Profession[activityDto.profession as keyof typeof Profession],
			activityDto.passive,
			activityDto.coop,
			activityDto.xp,
			activityDto.kp,
			activityDto.materials.map((item) => ({
				materialName: item.name,
				quantity: item.quantity

			})),
			activityDto.level,
			activityDto.tool,
			activityDto.duration
		);
	}
}