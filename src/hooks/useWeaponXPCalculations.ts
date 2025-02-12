import { useMemo } from 'react';
import { Material } from '@/domain/models/material.ts';
import {resolveTotalXp} from '@/domain/services/calculatorService.ts';
import {Product} from "@/domain/models/product.ts";

export interface XPCalculationInputs {
	materials: Map<string, Material>;
	neededXp: number;
}

export function useWeaponXPCalculations(weapons: Product[], calculationInputs: XPCalculationInputs, isNonReady: boolean) {
	return useMemo(() => {
		if (isNonReady) return new Map();
		return new Map(
			weapons.map((weapon) => [
				weapon.fullName,
				resolveTotalXp(weapon, calculationInputs.materials)
			])
		);
	}, [weapons, calculationInputs.materials, isNonReady]);
}