import {useQuery} from "@tanstack/react-query";

import {Profession, WeaponProfession} from "@/profession.ts";

import {Printrequests} from "@/services/api/askApi.ts";
import {Weapon} from "@/domain/models/weapon.ts";
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
	"Profession Level A",
	"Profession Level A High",
	"-Dropped item.Dropped from.Activity JSON"
]


export function useWikiWeapons(professions: WeaponProfession[] = [Profession.Stonemason]) {
	console.log("useWikiWeapons called with professions: ", professions)
	return useQuery({
		queryKey: ['wiki', 'weapons', professions],
		queryFn: async () => {
			console.log("Starting Fetching weapons for professions: ", professions)
			const results = await WikiApi.fetchAllPages({
				askParams: {
					limit: 50,
					sort: ["Profession Level A"]
				},
				categoriesAND: ["Weapons"],
				categoriesOR: professions,
				printRequests: WEAPONS_PRINTREQUESTS,
			});

			const weapons = new Map<string, Weapon>();
			for (const [key, result] of results) {
				const weapon = WikiMapper.toWeapon(result);
				if (weapon) {
					weapons.set(key, weapon);
				}
			}
			console.log("Finished Fetching weapons for professions: ", professions)
			return weapons;
		},
	})
}

export function useWikiMaterials(professions: Profession[] = DefaultCraftProfessions) {
	return useQuery({
		queryKey: ['wiki', 'materials', professions],
		queryFn: async () => {
			console.log("Starting Fetching materials for professions: ", professions)
			const results = await WikiApi.fetchAllPages({
				professionA: professions,
				categoriesOR: ['Items'],
				printRequests: MATERIALS_PRINTREQUESTS,
				askParams: {
					limit: 500,
					sort: ["Profession Level A"]
				}
			});

			const materials = new Map<string, Material>();
			for (const [key, result] of results) {
				const material = WikiMapper.toMaterial(result);
				if (material) {  // Only add valid materials
					materials.set(key, material);
				}
			}
			console.log("Finished Fetching materials for professions: ", professions)
			return materials;
		},
	})
}