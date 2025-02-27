import {Profession, ProfessionSetting} from "@/profession.ts";
import {Material} from "@/domain/models/material.ts";
import {Product} from "@/domain/models/product.ts";

interface MaterialBalance {
	required: number;    // How much we need
	produced: number;    // How much we'll actually make
	excess: number;      // produced - required
	batches: number;     // How many craft/gather operations
	totalCost: number;   // Total cost for all batches
}

export function calculateCraftingMetrics(
	product: Product,
	productQuantityNeeded: number,
	professionSettings: Map<Profession, ProfessionSetting> = new Map(),
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
			return {required: requiredQuantity, produced: 0, excess: 0, batches: 0, totalCost: 0};
		}

		const professionSetting = professionSettings.get(material.profession);
		const shouldPurchase =
			!professionSetting || // Handle undefined professionSetting
			!professionSetting.enabled || // Profession is disabled
			(material.level && material.level > (professionSetting?.level || 0)) || // Level requirement not met
			(!material.recipe && !material.activity); // Material has no crafting/gathering method

		console.group(`should purchase ${material.name}?`);
		console.log("shouldPurchase", shouldPurchase);
		console.log("professionSetting", professionSetting);
		console.log("material", material);
		console.groupEnd();


		if (shouldPurchase && material.cost) {
			const INVENTORY_SLOTS = 24;  // Standard inventory size
			const MERCHANT_TRIP_DURATION = 0;  // 30 seconds per trip

			console.log("mat  prof is merchant", material.profession === Profession.Merchant);
			console.log(`mat ${material.name} level is`, material.level, "prof level is", professionSetting?.level);
			console.log("mat cost is", material.cost, "mat value is", material.value);
			const WHATISTHECHARGE = material.profession === Profession.Merchant
				? (material.level && professionSetting?.level && professionSetting.level >= material.level
					? material.value
					: material.cost)
				: material.cost;


			const balance = {
				required: requiredQuantity,
				produced: remainingNeeded,
				excess: availableExcess,
				batches: 0,
				totalCost: WHATISTHECHARGE * remainingNeeded
			};

			// Calculate how many trips to the merchant are needed
			const tripsToShop = Math.ceil(remainingNeeded / INVENTORY_SLOTS);
			metrics.totalDuration += tripsToShop * MERCHANT_TRIP_DURATION;
			return balance;
		}

		if (material.recipe) {
			const batches = Math.ceil(remainingNeeded / material.recipe.outputQuantity);
			const produced = batches * material.recipe.outputQuantity;
			const balance = {
				required: requiredQuantity,
				produced,
				excess: produced + availableExcess - requiredQuantity,
				batches,
				totalCost: 0

			};

			const current = metrics.professionTotals.get(material.profession) || {duration: 0, xp: 0, kp: 0};
			console.log(`Kp: ${material.kp} Name: ${material.name} Profession: ${material.profession} For recipe`);
			metrics.professionTotals.set(material.profession, {
				duration: current.duration + (material.duration * batches),
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
				batches,
				totalCost: 0
			};

			const current = metrics.professionTotals.get(material.profession) || {duration: 0, xp: 0, kp: 0};
			console.log(`Kp: ${material.kp} Name: ${material.name} Profession: ${material.profession} For activity`);
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


		throw new Error(`No recipe or activity found for ${material.name}`);
	}

	processItem(Material.fromProduct(product), productQuantityNeeded);


	// Handle initial product
	/*const profMetrics = metrics.professionTotals.get(product.profession) || {duration: 0, xp: 0, kp: 0};
	profMetrics.duration += product.duration * productQuantityNeeded;
	profMetrics.xp += product.xp * productQuantityNeeded;
	profMetrics.kp += product.kp * productQuantityNeeded;
	metrics.professionTotals.set(product.profession, profMetrics);
	console.log("product duration", product.duration, "batches", productQuantityNeeded);
	metrics.totalDuration += product.duration * productQuantityNeeded;
	metrics.totalXp += product.xp * productQuantityNeeded;
	metrics.totalKp += product.kp * productQuantityNeeded;
	console.log(`Kp: ${product.kp} Name: ${product.name} Profession: ${product.profession} For product`);*/

	// Process product materials
	/*for (const {materialName, quantity} of product.recipe.materials) {
		const material = materials.get(materialName);
		if (!material) throw new Error(`Missing material: ${materialName}`);
		const crafts = productQuantityNeeded / product.recipe.outputQuantity;
		const needed = crafts * quantity;
		const balance = processItem(material, needed);
		metrics.materialBalances.set(materialName, balance);
	}*/
	console.log("Finished processing metrics", metrics);

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
		batches: existing.batches + update.batches,
		totalCost: existing.totalCost + update.totalCost
	};
}