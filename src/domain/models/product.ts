import {Item} from "@/domain/models/item.ts";
import {Recipe} from "@/domain/models/recipe.ts";

import {Faction, Profession} from "@/profession.ts";

export class Product implements Item {
	constructor(imageUrl: string, fullName: string, recipe: Recipe, levelMax: number, public faction: Faction, public description: string, public variant: string, public name: string, public link: string) {

		this.xp = recipe.xp;
		this.kp = recipe.kp;
		this.duration = recipe.duration;
		this.profession = recipe.profession;
		this.passive = recipe.passive;
		this.level = recipe.levelRequired;


		this.fullName = fullName;
		this.imageUrl = imageUrl;
		this.recipe = recipe;
		this.levelMax = levelMax;
	}

	fullName: string;
	imageUrl: string;
	// the xp to make/harvest
	xp: number;
	// the kp to make/harvest
	kp: number;
	profession: Profession;
	// unlock level
	level: number;
	levelMax: number;
	passive: boolean;

	duration: number;

	recipe: Recipe;
}