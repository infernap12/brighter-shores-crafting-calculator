import {Weapon} from "@/domain/models/weapon.ts";
import {Material} from "@/domain/models/material.ts";
import {Profession} from "@/profession.ts";

export function resolveTotalXp(item: Weapon, mats: Map<string, Material>): number {
	let totalXp = 0;

	for (const materialDto of item.recipe.materials) {
		const material = mats.get(materialDto.materialName);
		if (!material) {
			throw new Error(`Material not found: ${materialDto.materialName}`);
		}
		if (item.recipe.profession !== material.recipe?.profession) {
			continue;
		}
		const crafts = materialDto.quantity / (material.recipe?.outputQuantity ?? 1);

		totalXp += (recursiveMat(material, item.recipe.profession, mats) * crafts);
	}
	return totalXp + item.recipe.xp;
}

function recursiveMat(material: Material, targetProfession: Profession, materialDatabase: Map<string, Material>): number {
	console.log("resolving material: ", material.fullName);
	// Base case - raw material or wrong profession
	if (!material.recipe || material.recipe.profession !== targetProfession) {
		return 0;
	}

	let totalXp = material.recipe.xp;

	// Calculate XP needed for submaterials
	for (const subRecipeMaterial of material.recipe.materials) {
		// Hydrate the submaterial using the database
		const fullSubMaterial = materialDatabase.get(subRecipeMaterial.materialName);
		if (!fullSubMaterial) {
			console.error(`Material ${subRecipeMaterial.materialName} not found in database`);
			return 0;
		}

		const craftsNeeded = Math.ceil(subRecipeMaterial.quantity / material.recipe.outputQuantity);
		totalXp += recursiveMat(fullSubMaterial, targetProfession, materialDatabase) * craftsNeeded;
	}

	return totalXp;
}

export function resolveClassic(weapon: Weapon, mats: Map<string, Material>): number {
	console.log("Resolving Classic: " + weapon.fullName)
	const hydratedMats = weapon.recipe.materials.map(mat => {
		const material = mats.get(mat.materialName);
		if (!material) {
			throw new Error(`Material not found: ${mat.materialName}`);
		}
		return {material, quantity: mat.quantity};
	})
	const primaryMat = hydratedMats.find((mat) => {
		return mat.material.profession === weapon.recipe.profession
	})!
	return primaryMat.quantity * primaryMat.material.recipe!.xp + weapon.recipe.xp;
}