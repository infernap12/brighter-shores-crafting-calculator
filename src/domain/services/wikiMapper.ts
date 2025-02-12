import {Bool, Result} from "@/services/api/askApi.ts";
import {Product} from "@/domain/models/product.ts";
import {Recipe} from "@/domain/models/recipe.ts";
import {Faction, Profession} from "@/profession.ts";
import {ActivityDto, RecipeDto} from "@/services/api/types/dto.ts";
import {Material} from "@/domain/models/material.ts";
import {Activity} from "@/domain/models/activity.ts";

export class WikiMapper {
	static toWeapon(result: Result): Product | null {
		const recipeStr = result.printouts["Recipe JSON"]![0];
		if (!recipeStr) return null
		const recipe = Recipe.fromDto(JSON.parse(recipeStr) as RecipeDto);

		const imageNode = result.printouts.Image?.[0];
		const imagePath = imageNode
			? `https://brightershoreswiki.org/images/${imageNode.fullurl.split('File:').pop()}`
			: "https://brightershoreswiki.org/images/Stop_hand_nuvola_red.svg?88024";

		const levelMax = result.printouts["Profession Level A High"]![0];
		const faction = result.printouts["Profession A"]?.[0].fulltext as Faction ?? "Factionless";
		const description = result.printouts.Description?.[0] ?? "";
		const variant = result.printouts["Variant name"]?.[0] ?? "";
		const name = result.printouts.Name?.[0] ?? "";
		const link = result.fullurl;
		console.log("link for weapon is",link)

		return new Product(
			imagePath,
			result.fulltext,
			recipe,
			levelMax,
			faction,
			description,
			variant,
			name,
			link
		);
	}

	static toMaterial(result: Result): Material | null {
		const recipeStr = result.printouts["Recipe JSON"]?.[0];
		const activityStr = result.printouts["Activity JSON"]?.[0];

		let recipe, activity;
		if (recipeStr) {
			recipe = Recipe.fromDto(JSON.parse(recipeStr) as RecipeDto);
		}
		if (activityStr) {
			activity = Activity.fromDto(JSON.parse(activityStr) as ActivityDto);
		}
		const hasSellprice = result.printouts["Shop sell price"]?.[0] !== undefined;
		const hasBuyprice = result.printouts["Shop buy price"]?.[0] !== undefined;

		if (!activity && !recipe && (!hasBuyprice || !hasSellprice)) {
			console.warn("Material doesn't have recipe or activity or price:", result.fulltext);
			return null;
		}

		const imageNode = result.printouts.Image?.[0];
		const imagePath = imageNode
			? `https://brightershoreswiki.org/images/${imageNode.fullurl.split('File:').pop()}`
			: "https://brightershoreswiki.org/images/Stop_hand_nuvola_red.svg?88024";


		const shopBuyPrice = Number(result.printouts["Shop buy price"]?.[0]) || 0;
		const shopSellPrice = Number(result.printouts["Shop sell price"]?.[0]) || 0;
		const professionA = result.printouts["Profession A"]?.[0].fulltext as Profession ?? "Factionless";

		const passive: boolean | undefined =
			result.printouts["Passive"]?.[0] === Bool.true;
		const level = result.printouts["Profession Level A"]?.[0] ?? 0;


		return new Material(
			imagePath,
			result.fulltext,
			recipe,
			activity,
			result.printouts.Description?.[0] ?? "",
			result.printouts["Variant name"]?.[0] ?? "",
			result.printouts.Name?.[0] ?? "",
			shopBuyPrice,
			shopSellPrice,
			result.fullurl,
			professionA,
			passive,
			level
		);
	}
}