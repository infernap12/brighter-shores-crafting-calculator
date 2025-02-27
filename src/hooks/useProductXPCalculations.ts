import {useMemo} from "react";
import {Material} from "@/domain/models/material.ts";
import {resolveTotalXp} from "@/domain/services/calculatorService.ts";
import {Product} from "@/domain/models/product.ts";

export interface XPCalculationInputs {
	materials: Map<string, Material>;
	neededXp: number;
}

export function useProductXPCalculations(products: Product[], calculationInputs: XPCalculationInputs, isNonReady: boolean) {
	return useMemo(() => {
		if (isNonReady) return new Map<string, number>();
		return new Map(
			products.map((product) => [
				product.fullName,
				resolveTotalXp(product, calculationInputs.materials)
			])
		);
	}, [products, calculationInputs.materials, isNonReady]);
}