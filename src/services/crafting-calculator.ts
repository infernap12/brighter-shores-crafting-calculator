import {Profession} from "@/profession.ts";
import {Material} from "@/domain/models/material.ts";
import {Product} from "@/domain/models/product.ts";

interface MaterialBalance {
	required: number;    // How much we need
	produced: number;    // How much we'll actually make
	excess: number;      // produced - required
	batches: number;     // How many craft/gather operations
}

export function calculateCraftingMetrics(
	weapon: Product,
	quantity: number,
	materials: Map<string, Material>,
	existingExcess: Map<string, number> = new Map()
): CraftingMetrics {
	const metrics: CraftingMetrics = {
		professionTotals: new Map(),
		materialBalances: new Map(),
		totalDuration: 0,
		totalXp: 0,
		totalKp: 0
	};


	function processItem(material: Material, requiredQuantity: number): MaterialBalance {
		console.log(`Processing ${material.name} (${requiredQuantity})`);
		const availableExcess = existingExcess.get(material.name) || 0;
		const remainingNeeded = Math.max(0, requiredQuantity - availableExcess);

		if (remainingNeeded === 0) {
			existingExcess.set(material.name, availableExcess - requiredQuantity);
			return { required: requiredQuantity, produced: 0, excess: 0, batches: 0 };
		}

		if (material.recipe) {
			const batches = Math.ceil(remainingNeeded / material.recipe.outputQuantity);
			const produced = batches * material.recipe.outputQuantity;
			const balance = {
				required: requiredQuantity,
				produced,
				excess: produced + availableExcess - requiredQuantity,
				batches
			};

			const current = metrics.professionTotals.get(material.profession) || { duration: 0, xp: 0, kp: 0 };
			console.log(`Kp: ${material.kp} Name: ${material.name} Profession: ${material.profession} For recipe`)
			metrics.professionTotals.set(material.profession, {
				duration: current.duration + material.duration * batches,
				xp: current.xp + material.xp * batches,
				kp: current.kp + material.kp * batches
			});
			metrics.totalDuration += material.duration * batches;
			metrics.totalXp += material.xp * batches;
			metrics.totalKp += material.kp * batches;

			for (const input of material.recipe.materials) {
				const inputMaterial = materials.get(input.materialName);
				if (!inputMaterial) throw new Error(`Material not found: ${input.materialName}`);
				const materialBalance = processItem(inputMaterial, input.quantity * batches);
				metrics.materialBalances.set(input.materialName,
					mergeBalance(metrics.materialBalances.get(input.materialName), materialBalance));
			}

			return balance;
		}


		if (material.activity) {
			const batches = Math.ceil(remainingNeeded / material.activity.outputQuantity);
			const produced = batches * material.activity.outputQuantity;
			const balance = {
				required: requiredQuantity,
				produced,
				excess: produced + availableExcess - requiredQuantity,
				batches
			};

			const current = metrics.professionTotals.get(material.profession) || { duration: 0, xp: 0, kp: 0 };
			console.log(`Kp: ${material.kp} Name: ${material.name} Profession: ${material.profession} For activity`)
			metrics.professionTotals.set(material.profession, {
				duration: current.duration + material.duration * batches,
				xp: current.xp + material.xp * batches,
				kp: current.kp + material.kp * batches
			});
			metrics.totalDuration += material.duration * batches;
			metrics.totalXp += material.xp * batches;
			metrics.totalKp += material.kp * batches;

			return balance;
		}

		if (material.cost && material.value) {
			const batches = remainingNeeded;
			const produced = batches;
			const balance = {
				required: requiredQuantity,
				produced,
				excess: produced + availableExcess - requiredQuantity,
				batches
			};

			const current = metrics.professionTotals.get(material.profession) || { duration: 0, xp: 0, kp: 0 };
			console.log(`Kp: ${material.kp} Name: ${material.name} Profession: ${material.profession} For activity`)
			metrics.professionTotals.set(material.profession, {
				duration: current.duration + material.duration * batches,
				xp: current.xp + material.xp * batches,
				kp: current.kp + material.kp * batches
			})
			metrics.totalDuration += material.duration * batches;
			metrics.totalXp += material.xp * batches;
			metrics.totalKp += material.kp * batches;

			return balance;
		}

		throw new Error(`No recipe or activity found for ${material.name}`);
	}

	// Handle initial weapon
	const batches = Math.ceil(quantity / weapon.recipe.outputQuantity);
	const profMetrics = metrics.professionTotals.get(weapon.profession) || { duration: 0, xp: 0, kp: 0 };
	profMetrics.duration += weapon.duration * batches;
	profMetrics.xp += weapon.xp * batches;
	profMetrics.kp += weapon.kp * batches;
	metrics.professionTotals.set(weapon.profession, profMetrics);
	metrics.totalDuration += weapon.duration * batches;
	metrics.totalXp += weapon.xp * batches;
	metrics.totalKp += weapon.kp * batches;
	console.log(`Kp: ${weapon.kp} Name: ${weapon.name} Profession: ${weapon.profession} For weapon`)

	// Process weapon materials
	for (const {materialName, quantity} of weapon.recipe.materials) {
		const material = materials.get(materialName);
		if (!material) throw new Error(`Missing material: ${materialName}`);
		const balance = processItem(material, quantity * batches);
		metrics.materialBalances.set(materialName, balance);
	}

	return metrics;
}

export interface CraftingMetrics {
	professionTotals: Map<Profession, ProfessionMetrics>;
	materialBalances: Map<string, MaterialBalance>;
	totalDuration: number;
	totalXp: number;
	totalKp: number;
}

interface ProfessionMetrics {
	duration: number;
	xp: number;
	kp: number;
}


function mergeBalance(existing: MaterialBalance | undefined, update: MaterialBalance): MaterialBalance {
	if (!existing) return update;
	return {
		required: existing.required + update.required,
		produced: existing.produced + update.produced,
		excess: existing.excess + update.excess,
		batches: existing.batches + update.batches
	};
}