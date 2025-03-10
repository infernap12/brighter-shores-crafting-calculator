import {useQueries, useQuery} from "@tanstack/react-query";

import {Profession, professionProperties} from "@/profession.ts";

import {Printrequests} from "@/services/api/askApi.ts";
import {Product} from "@/domain/models/product.ts";
import {WikiMapper} from "@/domain/services/wikiMapper.ts";
import {Material} from "@/domain/models/material.ts";
import {WikiApi} from "@/services/api/wikiApi.ts";
import {ActivityDto} from "@/services/api/types/dto.ts";
import {Activity} from "@/domain/models/activity.ts";

const DefaultCraftProfessions = [
	Profession.Blacksmith,
	Profession.Stonemason,
	Profession.Bonewright,
	Profession.Miner,
	Profession.Gatherer,
	Profession.Woodcutter,
	Profession.Carpenter,
];

const PRODUCTS_PRINTREQUESTS: Printrequests[] = [
	"Category",
	"Recipe JSON",
	"Image",
	"Description",
	"Name",
	"Variant name",
	"Variant of",
	"Profession Level A",
	"Profession Level A High",
	"Profession A",
];

const MATERIALS_PRINTREQUESTS: Printrequests[] = [
	"Category",
	"Recipe JSON",
	"Image",
	"Description",
	"Name",
	"Variant name",
	"Variant of",
	"Passive",
	"Profession A",
	"Profession Level A",
	"Profession Level A High",
	"-Sold item.Shop buy price=Shop buy price",
	"-Sold item.Shop sell price=Shop sell price",
];

export function useWikiProducts(profession: Profession = Profession.Stonemason, passive: boolean) {
	console.log("useWikiProducts called with profession: ", profession);

	const craftType = (() => {
		if (passive) return "Pages with recipes";
		if (profession in professionProperties) {
			return professionProperties[profession as keyof typeof professionProperties].outputCategory;
		}
		console.error("Profession does not have obvious output category: ", profession)
		return "";
	})();
	return useQuery({
		queryKey: ["wiki", "products", craftType, profession, passive],
		queryFn: async () => {
			console.log("Starting Fetching products for profession: ", profession);
			const results = await WikiApi.fetchAllPages({
				askParams: {
					limit: 50,
					sort: ["Profession Level A"]
				},
				categoriesAND: [craftType],
				categoriesOR: [profession],
				passive,
				printRequests: PRODUCTS_PRINTREQUESTS,
			});

			const products = new Map<string, Product>();
			for (const [key, result] of results) {
				const product = WikiMapper.toProduct(result);
				if (product) {
					products.set(key, product);
				}
			}
			console.log("Finished Fetching products for profession: ", profession);
			return products;
		},
	});
}

export function useContainers() {
	return useQuery({
		queryKey: ["wiki", "materials", "containers"],
		queryFn: async () => {
			const results = await WikiApi.fetchAllPages({
				categoriesOR: ["containers"],
				passive: true,
				printRequests: MATERIALS_PRINTREQUESTS,
				askParams: {
					limit: 10
				}
			});

			const materials = new Map<string, Material>();
			for (const [key, result] of results) {
				const material = WikiMapper.toMaterial(result);
				if (material) {  // Only add valid materials
					materials.set(key, material);
				}
			}
			console.log("Finished Fetching containers: ", materials);
			return materials;
		}
	});
}


export function useWikiMaterials(professions: Profession[] = DefaultCraftProfessions, passive: boolean = false) {
	console.log("useWikiMaterials called with professions: ", professions);
	return useQueries(
		{
			queries: [
				...professions.map((profession) => {
					console.log("init query multi query - ", profession);
					return ({
						queryKey: ["wiki", "materials", profession, passive],
						queryFn: async () => {
							console.log("Starting Fetching materials for profession: ", profession);
							const results = await WikiApi.fetchAllPages({
								professionA: [profession],
								categoriesOR: ["Items"],
								passive,
								printRequests: MATERIALS_PRINTREQUESTS,
								askParams: {
									limit: 50,
								}
							});
							console.log("results for ", results);


							const skillNodeResults = await WikiApi.fetchAllPages({
								professionA: [profession],
								categoriesOR: ["Skill nodes"],
								printRequests: [
									"Activity JSON",
									"Variant of.Action per hour banking=Action per hour banking",
								],
								askParams: {
									limit: 10,
								}

							});


							console.log("nodes", skillNodeResults);

							const activities: Activity[] = Array.from(skillNodeResults.entries()).flatMap(([, node]) => {
								const activityJsonStrings: string[] = node.printouts["Activity JSON"] ?? [];
								return activityJsonStrings
									.map(activityJson => {
										const parsedDto = JSON.parse(activityJson) as ActivityDto;
										const activity = Activity.fromDto(parsedDto);
										if (Array.isArray(node.printouts["Action per hour banking"]) && Number.isInteger(node.printouts["Action per hour banking"]?.[0])) {
											activity.duration = 3600 / node.printouts["Action per hour banking"][0];
										}
										return activity;
									})
									.filter(act => act.passive === passive && !act.coop);
							});

							console.log("activities", activities);

							const materials = new Map<string, Material>();
							for (const [key, result] of results) {

								const categories: string[] = result.printouts.Category!.map(c => c.fulltext);
								console.warn("list of categories to search for capes/ bounties and exclude", categories);
								const disallowedCategories = [
									"Category:Profession capes",
									"Category:Pages with bounties",
									"Category:Equipment",
								];
								if (categories.some(category => disallowedCategories.includes(category))) {
									continue;
								}
								const material = WikiMapper.toMaterial(result, activities);
								if (material) {  // Only add valid materials
									materials.set(key, material);
								}
							}
							console.log("Finished Fetching materials for professions: ", professions);
							return materials;
						},
					});
				})],
		}
	)
}


export function useWikiSingleMaterial(name: string | null) {
	return useQuery({
		queryKey: ["wiki", "material", name],
		queryFn: async () => {
			if (!name) {
				return null;
			}
			console.log(`Fetching single material with name: ${name}`);
			const results = await WikiApi.fetchAllPages({
				name: name,
				categoriesOR: ["Items"],
				printRequests: MATERIALS_PRINTREQUESTS,
				askParams: {
					limit: 1,
				}
			});
			console.log(`Single material results: `, results);
			// Assuming there will be only one result for the given name
			const [[, result]] = results;
			const material = WikiMapper.toMaterial(result);
			console.log(`Single material: `, material);

			if (!material) {
				throw new Error(`Single Material with name "${name}" not found`);
			}

			console.log(`Fetched single material: `, material);
			return material;
		},
	});
}
