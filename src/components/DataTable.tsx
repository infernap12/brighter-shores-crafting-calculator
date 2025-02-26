import {useEffect} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ceil} from "@/lib/utils.ts";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {Material} from "@/domain/models/material.ts";
import {Profession} from "@/profession.ts";
import {useWeaponXPCalculations} from "@/hooks/useWeaponXPCalculations.ts";
import {useFilteredWeapons} from "@/hooks/useFilteredWeapons.ts";
import {Product} from "@/domain/models/product.ts";

interface WeaponFilters {
	profession: Profession;
	maxLevel: number | null;
}

interface XPCalculationInputs {
	neededXp: number;
	materials: Map<string, Material>;
}

export function DataTableContainer({weapons, filters, calculationInputs, onSelectWeapon, selectedWeapon, isNonReady}: {
	weapons: Map<string, Product>;
	filters: WeaponFilters;
	calculationInputs: XPCalculationInputs;
	onSelectWeapon: (weapon: Product) => void
	selectedWeapon: Product | null;
	isNonReady: boolean;
}) {
	const filteredWeapons = useFilteredWeapons(weapons, filters);

	useEffect(() => {
		const weaponNotFound = !filteredWeapons.find(w => w.name === selectedWeapon?.name);
		if (filteredWeapons.length > 0 && weaponNotFound) {
			onSelectWeapon(filteredWeapons[0]);
		}
	}, [filteredWeapons, onSelectWeapon, selectedWeapon?.name]);

	if (filteredWeapons.length === 0) {
		return <div className="p-4 text-center">No weapons </div>;
	}

	return (
		<WeaponTable
			weapons={filteredWeapons}
			calculationInputs={calculationInputs}
			onSelectWeapon={onSelectWeapon}
			isNonReady={isNonReady}
		/>
	);
}

function WeaponTable(
	{
		weapons,
		calculationInputs,
		onSelectWeapon,
		isNonReady,
	}: {
		weapons: Product[];
		calculationInputs: XPCalculationInputs;
		onSelectWeapon: (weapon: Product) => void;
		isNonReady: boolean;
	}
) {

	const weaponXp = useWeaponXPCalculations(weapons, calculationInputs, isNonReady);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{/*Image*/}
					<TableHead></TableHead>
					{/*Level*/}
					<TableHead>Level</TableHead>
					{/*Name*/}
					<TableHead>Name</TableHead>
					{/*XP*/}
					<TableHead>XP</TableHead>
					{/*Items Needed*/}
					<TableHead># Crafts</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{
					weapons
						.map((weapon: Product) => {
							const totalXp = weaponXp.get(weapon.fullName);
							if (totalXp === undefined) {
								return null;
							}
							const craftsNeeded = ceil(calculationInputs.neededXp / totalXp);
							return (
								<TableRow
									key={weapon.fullName}
									className="cursor-pointer hover:bg-gray-100"
									onClick={() => onSelectWeapon(weapon)}
								>
									<TableCell>
										<Avatar>
											<AvatarImage
												src={weapon.imageUrl}
												alt={weapon.name}
											/>
										</Avatar>
									</TableCell>
									<TableCell>{weapon.level}</TableCell>
									<TableCell>{weapon.fullName}</TableCell>
									<TableCell>{totalXp.toLocaleString()}</TableCell>
									<TableCell>{craftsNeeded.toLocaleString()}</TableCell>
								</TableRow>
							);
						})
				}

			</TableBody>
		</Table>
	);
}