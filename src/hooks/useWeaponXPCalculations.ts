import { useMemo } from 'react';
import { Material } from '@/domain/models/material.ts';
import { resolveClassic } from '@/domain/services/calculatorService.ts';
import {Weapon} from "@/domain/models/weapon.ts";

export interface XPCalculationInputs {
	materials: Map<string, Material>;
	neededXp: number;
}

export function useWeaponXPCalculations(weapons: Weapon[], calculationInputs: XPCalculationInputs) {
	return useMemo(() => {
		return new Map(
			weapons.map((weapon) => [
				weapon.fullName,
				resolveClassic(weapon, calculationInputs.materials)
			])
		);
	}, [weapons, calculationInputs.materials]);
}