// hooks/useFilteredWeapons.ts
import {useMemo} from "react";
import {Product} from "@/domain/models/product.ts";
import {Profession} from "@/profession.ts";

export interface ProductFilters {
	profession: Profession;
	maxLevel: number | null;
}

export function useFilteredProducts(products: Map<string, Product>, filters: ProductFilters) {
	return useMemo(() => {
		return Array.from(products.values())
			.filter((product) => product.profession === filters.profession)
			.filter((product) => filters.maxLevel === null || product.level <= filters.maxLevel)
			.sort((a, b) => b.level - a.level);
	}, [products, filters.profession, filters.maxLevel]);
}