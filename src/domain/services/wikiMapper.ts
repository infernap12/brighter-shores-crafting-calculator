import {Bool, Result} from "@/services/api/askApi.ts";
import {Product} from "@/domain/models/product.ts";
import {Recipe} from "@/domain/models/recipe.ts";
import {Faction, Profession} from "@/profession.ts";
import {RecipeDto} from "@/services/api/types/dto.ts";
import {Material} from "@/domain/models/material.ts";
import {Activity} from "@/domain/models/activity.ts";

export class WikiMapper {
	static toProduct(result: Result): Product | null {
		console.log("printouts for product", result.printouts)
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
		const baseName = result.printouts["Variant of"]?.[0]?.fulltext ?? "Dave"
		const link = result.fullurl;
		console.log("link for product is", link)

		return new Product(
			imagePath,
			result.fulltext,
			recipe,
			levelMax,
			faction,
			description,
			variant,
			name,
			link,
			baseName
		);
	}

	static toMaterial(result: Result, activities: Activity[] = []): Material | null {
		console.log("Material to material called with result: ", result, "for material", result.fulltext)
		const name = result.printouts.Name?.[0] ?? "";
		const recipeStr = result.printouts["Recipe JSON"]?.[0];
		// todo fix
		const activity = activities.find(act => act.outputItem === name);

		let recipe;
		if (recipeStr) {
			recipe = Recipe.fromDto(JSON.parse(recipeStr) as RecipeDto);
		}
		const hasSellprice = result.printouts["Shop sell price"]?.[0] !== undefined;
		const hasBuyprice = result.printouts["Shop buy price"]?.[0] !== undefined;

		if (!activity && !recipe && !hasBuyprice && !hasSellprice) {
			console.warn("Material doesn't have recipe or activity or price:", result.fulltext);
			return null;
		}

		const imageNode = result.printouts.Image?.[0];
		const imagePath = imageNode
			? `https://brightershoreswiki.org/images/${imageNode.fullurl.split('File:').pop()}`
			: "https://brightershoreswiki.org/images/Stop_hand_nuvola_red.svg?88024";


		const shopBuyPrice = Number(result.printouts["Shop buy price"]?.[0]) || 0;
		const shopSellPrice = Number(result.printouts["Shop sell price"]?.[0]) || 0;
		const professionA = result.printouts["Profession A"]?.[0]?.fulltext as Profession ?? "Professionless";

		console.log("Profession A is", professionA, "for material", result.fulltext, "")
		console.log("Level is", result.printouts["Profession Level A"]?.[0], "for material", result.fulltext, "")

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
			name,
			shopBuyPrice,
			shopSellPrice,
			result.fullurl,
			professionA,
			passive,
			level
		);
	}
}