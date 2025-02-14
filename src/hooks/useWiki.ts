import {useQueries, useQuery} from "@tanstack/react-query";

import {Profession, professionProperties} from "@/profession.ts";

import {Printrequests} from "@/services/api/askApi.ts";
import {Product} from "@/domain/models/product.ts";
import {WikiMapper} from "@/domain/services/wikiMapper.ts";
import {Material} from "@/domain/models/material.ts";
import {WikiApi} from "@/services/api/wikiApi.ts";

const DefaultCraftProfessions = [
	Profession.Blacksmith,
	Profession.Stonemason,
	Profession.Bonewright,
	Profession.Miner,
	Profession.Gatherer,
	Profession.Woodcutter,
	Profession.Carpenter,
]

const WEAPONS_PRINTREQUESTS: Printrequests[] = [
	"Category",
	"Recipe JSON",
	"Image",
	"Description",
	"Name",
	"Variant name",
	"Profession Level A",
	"Profession Level A High",
	"Profession A",
]

const MATERIALS_PRINTREQUESTS: Printrequests[] = [
	"Category",
	"Recipe JSON",
	"Image",
	"Description",
	"Name",
	"Variant name",
	"Passive",
	'Profession A',
	"Profession Level A",
	"Profession Level A High",
	"-Dropped item.Dropped from.Activity JSON=Activity JSON",
	"-Sold item.Shop buy price=Shop buy price",
	"-Sold item.Shop sell price=Shop sell price",
]


export function useWikiProducts(profession: Profession = Profession.Stonemason, passive: boolean) {
	const craftType = professionProperties[profession].outputCategory;
	console.log("useWikiWeapons called with professions: ", profession)
	return useQuery({
		queryKey: ['wiki', "products", craftType, profession],
		queryFn: async () => {
			console.log("Starting Fetching weapons for professions: ", profession)
			const results = await WikiApi.fetchAllPages({
				askParams: {
					limit: 50,
					sort: ["Profession Level A"]
				},
				categoriesAND: [craftType],
				categoriesOR: [profession],
				passive,
				printRequests: WEAPONS_PRINTREQUESTS,
			});

			const weapons = new Map<string, Product>();
			for (const [key, result] of results) {
				const weapon = WikiMapper.toWeapon(result);
				if (weapon) {
					weapons.set(key, weapon);
				}
			}
			console.log("Finished Fetching weapons/products for profession: ", profession)
			return weapons;
		},
	})
}


export function useWikiSingleProfessionMaterials(profession: Profession) {
	return useQuery({
		queryKey: ['wiki', 'materials', profession],
		queryFn: async () => {
			const results = await WikiApi.fetchAllPages({
				professionA: [profession],
				categoriesOR: ['Items'],
				printRequests: MATERIALS_PRINTREQUESTS,
				askParams: {
					limit: 500,
					sort: ["Profession Level A"]
				}
			})

			const materials = new Map<string, Material>();
			for (const [key, result] of results) {

				const categories: string[] = result.printouts.Category!.map(c => c.fulltext);
				console.warn("list of categories to search for capes/ bounties and exclude",categories)
				if (categories.includes("Category:Profession capes") || categories.includes("Category:Pages with bounties")) {
					continue
				}
				const material = WikiMapper.toMaterial(result);
				if (material) {  // Only add valid materials
					materials.set(key, material);
				}
			}
			console.log("Finished Fetching materials for profession: ", profession)
			return materials;
		}
	});

}


export function useWikiMaterials(professions: Profession[] = DefaultCraftProfessions, passive: boolean = false) {
	console.log("useWikiMaterials called with professions: ", professions)
	return useQueries(
		{
			queries: professions.map((profession) => {
				console.log("init query multi query - ", profession)
				return ({
					queryKey: ['wiki', 'materials', profession],
					queryFn: async () => {
						console.log("Starting Fetching materials for profession: ", profession)

						const results = await WikiApi.fetchAllPages({
							professionA: [profession],
							categoriesOR: ['Items'],
							passive,
							printRequests: MATERIALS_PRINTREQUESTS,
							askParams: {
								limit: 500,
								sort: ["Profession Level A"]
							}
						});

						const materials = new Map<string, Material>();
						for (const [key, result] of results) {

							const categories: string[] = result.printouts.Category!.map(c => c.fulltext);
							console.warn("list of categories to search for capes/ bounties and exclude", categories)
							const disallowedCategories = [
								"Category:Profession capes",
								"Category:Pages with bounties",
								"Category:Equipment",
							];
							if (categories.some(category => disallowedCategories.includes(category))) {
								continue;
							}
							const material = WikiMapper.toMaterial(result);
							if (material) {  // Only add valid materials
								materials.set(key, material);
							}
						}
						console.log("Finished Fetching materials for professions: ", professions)
						return materials;
					},
				})
			}),

			/*combine: (results) => {
				const obj = results.reduce<CombinedResult>(
					(acc, result, index) => {
						// Combine all materials into a single Map
						if (result.data) {
							result.data.forEach((value, key) => {
								acc.combinedMaterials.set(key, value);
							});
						}

						// Add status information for each individual query
						acc.queryStatuses.push({
							profession: professions[index],
							isFetching: result.isFetching,
							isPending: result.isPending,
							isLoading: result.isLoading,
							isError: result.isError,
							error: result.error,
							data: result.data,
						});
						// Update global isFetching if any query is fetching
						acc.isFetching = acc.isFetching || result.isFetching;
						acc.isPending = acc.isPending || result.isPending;


						return acc;
					},
					{
						combinedMaterials: new Map<string, Material>(),
						queryStatuses: [],
						isFetching: false,
						isPending: false
					}
				);
				return obj;
			}*/

		}
	)
}

/*type QueryStatus = {
	profession: Profession;
	isFetching: boolean;
	isPending: boolean;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	data: Map<string, Material> | undefined;
}

type CombinedResult = {
    isPending: boolean;
	combinedMaterials: Map<string, Material>;
	queryStatuses: QueryStatus[];
	isFetching: boolean;
}*/


export function useWikiSingleMaterial(name: string | null) {
	return useQuery({
		queryKey: ['wiki', 'material', name],
		queryFn: async () => {
			if (!name) {
				return null;
			}
			console.log(`Fetching material with name: ${name}`);
			const results = await WikiApi.fetchAllPages({
				name: name,
				categoriesOR: ['Items'],
				printRequests: MATERIALS_PRINTREQUESTS,
				askParams: {
					limit: 1,
				}
			});
			// Assuming there will be only one result for the given name
			const [[, result]] = results;
			const material = WikiMapper.toMaterial(result);

			if (!material) {
				throw new Error(`Material with name "${name}" not found`);
			}

			console.log(`Fetched material: `, material);
			return material;
		},
	});
}
