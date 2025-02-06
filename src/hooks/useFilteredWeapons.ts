// hooks/useFilteredWeapons.ts
import { useMemo } from 'react';
import { Weapon } from '@/domain/models/weapon.ts';
import { Profession } from '@/profession.ts';

export interface WeaponFilters {
	profession: Profession;
	maxLevel: number | null;
}

export function useFilteredWeapons(weapons: Map<string, Weapon>, filters: WeaponFilters) {
	return useMemo(() => {
		return Array.from(weapons.values())
			.filter((weapon) => weapon.profession === filters.profession)
			.filter((weapon) => filters.maxLevel === null || weapon.level <= filters.maxLevel)
			.sort((a, b) => a.level - b.level);
	}, [weapons, filters.profession, filters.maxLevel]);
}