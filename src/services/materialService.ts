import {Profession} from "@/profession.ts";
import {useContainers, useWikiMaterials, useWikiProducts, useWikiSingleMaterial} from "@/hooks/useWiki.ts";
import {useEffect, useMemo, useState} from "react";


/**
 * A React hook for managing and retrieving materials within the context of crafting professions.
 * This hook provides functionality to dynamically fetch and manage materials across multiple
 * related professions, automatically expanding its scope as new material dependencies are discovered.
 *
 * @param initialProfession - The primary profession context (e.g., Profession.Blacksmith for
 *                           blacksmithing recipes). This profession serves as the starting point
 *                           for material lookups.
 *
 * @param passive
 * @returns An object containing:
 * - associatedProfessions: Array of professions that have been discovered as related
 * - getMaterialByName: Function to fetch materials by name
 * - allMaterials: Combined Map of all currently known materials
 * - queryStatuses: Status information for each profession's material query
 * - isFetching: Global loading state indicating if any queries are in progress
 *
 * @example
 * ```tsx
 * const {
 *   getMaterialByName,
 *   allMaterials,
 *   isFetching
 * } = useMaterialService(Profession.Blacksmith);
 *
 * // Fetch a specific material
 * const material = await getMaterialByName("Iron Ingot");
 * ```
 */

export function useMaterialService(initialProfession: Profession, passive: boolean = false) {
	const [associatedProfessions, setAssociatedProfessions] = useState([initialProfession]);
	const [materialToDiscover, setMaterialToDiscover] = useState<string | null>(null);
	const [isNonReady, setNonReady] = useState(true);
	const productsQuery = useWikiProducts(initialProfession, passive);
	const allMaterialsQuery = useWikiMaterials(associatedProfessions, passive);
	const discoveryQuery = useWikiSingleMaterial(materialToDiscover);
	const [lastProfession, setLastProfession] = useState(initialProfession);
	const [lastPassive, setLastPassive] = useState(passive);
	const containersQuery = useContainers();

	const mats = useMemo(() => {
		return new Map([
			...allMaterialsQuery?.flatMap((value) => Array.from(value?.data?.entries() || [])) || [],
			...(containersQuery?.data?.entries() || [])
		]);
	}, [allMaterialsQuery, containersQuery]);

	console.log("containers query", containersQuery)


	// Combined `isFetching` flag for allMaterialsQuery to check if any query is in a fetching state
	const allMaterialsFetching = allMaterialsQuery.some(query => query.isFetching);

	const isResetting = (initialProfession !== lastProfession) || (passive !== lastPassive);
	console.log("Material service called with profession:", initialProfession);
	console.group("Debug: useMaterialService Hook");
	console.log("Initial Profession:", initialProfession);
	console.log("Passive Mode:", passive);
	console.log("Associated Professions:", associatedProfessions);
	console.log("Material to Discover:", materialToDiscover);
	console.log("Is Non-Ready State:", isNonReady);
	console.log("Is resetting:", isResetting)
	console.log("Last Profession:", lastProfession);
	console.log("Products Query:", {
		data: productsQuery.data,
		isFetching: productsQuery.isFetching,
		isSuccess: productsQuery.isSuccess,
		isError: productsQuery.isError,
	});
	console.log("All Materials Query:", {
		combinedMaterials: mats,
		isFetching: allMaterialsQuery[0].isFetching,
	});
	console.log("Discovery Query:", {
		data: discoveryQuery.data,
		isFetching: discoveryQuery.isFetching,
		isSuccess: discoveryQuery.isSuccess,
		isError: discoveryQuery.isError,
	});
	console.groupEnd();


	if (isResetting) {
		setLastProfession(initialProfession);
		setLastPassive(passive);
		setAssociatedProfessions([initialProfession]);
		setMaterialToDiscover(null);
		setNonReady(true);
	}


	console.log("Effect dependencies and their current values:");
	console.log("productsQuery.data:", productsQuery.data);
	console.log("mats:", mats);
	console.log("discoveryQuery.data:", discoveryQuery.data);
	console.log("allMaterialsFetching:", allMaterialsFetching);
	useEffect(() => {
		console.log("Service entering use effect. Products Data: ", productsQuery.data, " not fetching: ", !allMaterialsFetching, "")
		if (productsQuery.data && !allMaterialsFetching) {
			console.log("Entering use effect. Products Data: ", productsQuery.data, " not fetching: ", !allMaterialsFetching, "")
			// Get missing materials from products AND known materials
			const missingMaterials = new Set<string>();

			productsQuery.data.forEach(product => {
				product.recipe.materials.forEach(ingredient => {
					if (!mats.has(ingredient.materialName)) {
						missingMaterials.add(ingredient.materialName);
					}
				});
			});
			// Then check material recipes (for multistep crafting
			mats.forEach(material => {
				material.recipe?.materials.forEach(ingredient => {
					if (!mats.has(ingredient.materialName)) {
						missingMaterials.add(ingredient.materialName);
					}
				});
			})

			// Handle discovery results
			if (discoveryQuery.data) {
				console.log("Handling discovery results: ", discoveryQuery.data)
				const newProfession = discoveryQuery.data.profession;
				if (!associatedProfessions.includes(newProfession)) {
					console.log("Adding new profession: ", newProfession)
					setAssociatedProfessions([...associatedProfessions, newProfession]);
					setMaterialToDiscover(null)
					return;
				}
			}
			// Start new discovery if needed
			if (missingMaterials.size > 0 && !materialToDiscover) {
				console.log("Starting new discovery for material: ", [...missingMaterials][0])
				setMaterialToDiscover([...missingMaterials][0]);
			} else if (!allMaterialsFetching && !discoveryQuery.isFetching && !productsQuery.isFetching) {
				console.log("Service finished loading all linked materials:")
				setNonReady(false);
			}
		}
	}, [
		initialProfession,
		productsQuery.data,
		mats,
		discoveryQuery.data,
		allMaterialsFetching,
		productsQuery.isFetching,
		discoveryQuery.isFetching,
		materialToDiscover,
		associatedProfessions
	]);

	console.log("Service isNonReady above return:", isNonReady);
	return {
		associatedProfessions,
		productsQuery: (isResetting || isNonReady) ? null : productsQuery,
		allMaterials: (isResetting || isNonReady) ? null : mats,
		allMaterialsQuery,
		isFetching: allMaterialsFetching || discoveryQuery.isFetching || productsQuery.isFetching,
		isPending: /*allMaterialsQuery.isPending ||*/ discoveryQuery.isPending || productsQuery.isPending,
		isNonReady,
		setNonReady
	};
}
