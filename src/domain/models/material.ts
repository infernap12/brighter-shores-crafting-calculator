import {Item} from "@/domain/models/item.ts";
import {Recipe} from "@/domain/models/recipe.ts";
import {Profession} from "@/profession.ts";
import {Activity} from "@/domain/models/activity.ts";
import * as console from "node:console";

export class Material implements Item {
	constructor(public imageUrl: string, public fullName: string, recipe: Recipe | undefined, activity: Activity | undefined, public description: string, public variant: string, public name: string) {



		if (recipe) {
			this.xp = recipe.xp;
			this.kp = recipe.kp;
			this.duration = recipe.duration;
			this.profession = recipe.profession;
			this.passive = recipe.passive;
			this.level = recipe.levelRequired;
			this.recipe = recipe;
		} else if (activity) {
			this.xp = activity.xp
			this.kp = activity.kp
			this.duration = activity.duration
			this.profession = activity.profession;
			this.passive = activity.passive;
			this.level = activity.level;
			this.activity = activity;
		} else {
			console.error("Failed to initialise material: " + name)
			throw new Error("Failed to initialise material")
		}
		this.recipe = recipe;
		this.activity = activity;
	}


	// the xp to make/harvest
	xp: number;
	// the kp to make/harvest
	kp: number;
	profession: Profession;
	// unlock level
	level: number;
	passive: boolean;
	duration: number;
	activity: Activity | undefined;
	recipe: Recipe | undefined;



}