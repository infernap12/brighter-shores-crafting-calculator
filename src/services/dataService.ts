/*
import {Weapon} from "@/domain/models/weapon.ts";
import {Material} from "@/domain/models/material.ts";
import {wikiApi} from "@/services/api/wikiApi.ts";
import {Faction, Profession} from "@/profession.ts";
import {ActivityDto, RecipeDto} from "@/services/api/types/dto.ts";
import {Recipe} from "@/domain/models/recipe.ts";
import {Activity} from "@/domain/models/activity.ts";
import {Result} from "@/services/api/askApi";

const profs = [
	Profession.Blacksmith,
	Profession.Stonemason,
	Profession.Bonewright,
	Profession.Miner,
	Profession.Gatherer,
	Profession.Woodcutter,
	Profession.Carpenter,
]

class DataService {
	async getProcessedData(): Promise<ProcessedData> {
		const rawMaterialsData = await wikiApi.fetchItemsForProfessions(profs)
		const materials = this.mapMats(rawMaterialsData)
		const rawWeaponsData = await wikiApi.useWikiWeapons()
		const weapons = this.mapWep(rawWeaponsData)

		return {
			weapons: weapons,
			materials: materials,
		}

	}

	mapMats(rawData: Map<string, Result>): Map<string, Material> {
		const materials = new Map<string, Material>()
		for (const [key, item] of rawData.entries()) {
			const recipStr = item.printouts["Recipe JSON"]![0]
			let recipe;
			if (recipStr) {
				const recipeDto = JSON.parse(recipStr) as RecipeDto
				recipe = Recipe.fromDto(recipeDto)
			}
			const activityStr = item.printouts["Activity JSON"]![0]
			let activity;
			if (activityStr) {
				const activityDto = JSON.parse(activityStr) as ActivityDto
				activity = Activity.fromDto(activityDto)
			}
			const imageNode = item.printouts.Image?.[0];
			let imagePath;
			if (imageNode) {
				imagePath = `https://brightershoreswiki.org/images/${imageNode.fullurl.split('File:').pop()}`;
			} else {
				imagePath = "https://brightershoreswiki.org/images/Stop_hand_nuvola_red.svg?88024"
			}
			if (!activity && !recipe) {
				console.warn("Material doesnt have a recipe or activity: " + key + "")
				continue
			}
			const description: string = item.printouts.Description?.[0] ?? ""
			const variant = item.printouts["Variant name"]?.[0] ?? ""
			const name = item.printouts.Name?.[0] ?? ""
			const fullName = item.fulltext
			const mat = new Material(imagePath, fullName, recipe, activity, description, variant, name)
			materials.set(fullName, mat)
		}
		return materials;
	}

	private mapWep(rawData: Map<string, Result>) {
		const weapons = new Map<string, Weapon>
		for (const [key, item] of rawData.entries()) {
			const recipeStr = item.printouts["Recipe JSON"]![0]
			let recipe;
			if (recipeStr) {
				const recipeDto = JSON.parse(recipeStr) as RecipeDto;
				recipe = Recipe.fromDto(recipeDto);
			} else {
				console.error("Weapon does not have a recipe: " + key)
				continue
			}
			const imageNode = item.printouts.Image?.[0];
			let imagePath;
			if (imageNode) {
				imagePath = `https://brightershoreswiki.org/images/${imageNode.fullurl.split('File:').pop()}`;
			} else {
				imagePath = "https://brightershoreswiki.org/images/Stop_hand_nuvola_red.svg?88024"
			}
			const levelMax = item.printouts["Profession Level A High"]![0]
			const faction = item.printouts["Profession A"]?.[0].fulltext as Faction ?? "Factionless"
			const description: string = item.printouts.Description?.[0] ?? ""
			const variant = item.printouts["Variant name"]?.[0] ?? ""
			const name = item.printouts.Name?.[0] ?? ""
			const fullName = item.fulltext
			const wep = new Weapon(imagePath, fullName, recipe, levelMax, faction, description, variant, name)
			weapons.set(fullName, wep)
		}
		return weapons;
	}
}

export interface ProcessedData {
	weapons: Map<string, Weapon>;
	materials: Map<string, Material>;
}

export const dataService = new DataService()*/
