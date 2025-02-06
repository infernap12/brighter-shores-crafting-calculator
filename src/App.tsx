import {WeaponCard} from "@/components/WeaponCard.tsx";
import {Weapon} from "@/domain/models/weapon.ts";
import {resolveClassic, resolveTotalXp} from "@/domain/services/calculatorService.ts";
import {useEffect, useMemo, useState} from 'react';
import {useWikiMaterials, useWikiWeapons} from "@/hooks/useWiki.ts";
import {Material} from "@/domain/models/material.ts";
import {InputForm, InputFormValues} from "@/components/InputForm.tsx";
import {DataTableContainer} from "@/components/DataTable.tsx";
import {WeaponProfession} from "@/profession.ts";
import {DataTableSkeleton, WeaponCardSkeleton} from "@/components/skeleton-loaders.tsx";
import {ceil} from "@/lib/utils.ts";
import {calculateCraftingMetrics} from "@/services/crafting-calculator.ts";
import {NetworkStatus} from "@/components/NetworkStatus.tsx";
import {MetricsCard} from "@/components/mc.tsx";


export interface UserData extends InputFormValues {
	neededXp: number;
}



function App() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const {
		isPending: isPendingW,
		error: errorW,
		data: weapons,
		isFetching: isFetchingW
	} = useWikiWeapons(userData?.profession ? [userData.profession as WeaponProfession] : undefined);
	const {isPending: isPendingM, error: errorM, data: materials, isFetching: isFetchingM} = useWikiMaterials();
	const isPending = isPendingW || isPendingM;

	const isFetching = isFetchingW || isFetchingM;
	const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
	// todo
	// const [craftMetrics, setCraftMetrics] = useState<CraftingMetrics | null>(null);
	// Set default selected weapon when weapons are loaded
	useEffect(() => {
		if (weapons && Array.from(weapons.values()).length > 0 && !selectedWeapon) {
			setSelectedWeapon(Array.from(weapons.values())[0]);
		}
	}, [weapons]);

	function onChange(inputs: InputFormValues) {
		const userData = inputs as UserData;
		// The cross-calculations are now handled in the InputForm component
		userData.neededXp = (userData.targetXP ?? 0) - (userData.currentXP ?? 0);
		setUserData(userData);
	}

	function onWeaponSelected(weapon: Weapon) {
		const crafts = ceil((userData?.neededXp ?? 0) / resolveTotalXp(weapon, materials!)) ?? 12
		console.log("Calculating metrics! Hold onto ya buts!", crafts, weapon)
		console.log(calculateCraftingMetrics(
			weapon,
			crafts,
			materials!
		));
		setSelectedWeapon(weapon)
	}

	return (
		<div className="container mx-auto p-4">
			<NetworkStatus queries={[
				{
					name: "Weapons",
					isPending: isPendingW,
					isFetching: isFetchingW
				},
				{
					name: "Materials",
					isPending: isPendingM,
					isFetching: isFetchingM
				}
			]}/>
			<LoadingState
				isPending={isPending}
				isFetching={isFetching}
				errors={[errorW, errorM].filter((it) => it !== null)}
			/>


			<div className="space-y-6">
				{/* Stack on mobile, side-by-side on md+ screens */}
				<div className="flex flex-col md:flex-row gap-6">
					{/* Form - full width on mobile, half on md+ */}
					<div className="w-full md:w-1/3">
						<InputForm onChange={onChange}/>
					</div>

					{/* Card - between form and table on mobile, right side on md+ */}
					<div className="w-full md:w-2/3 order-3 md:order-2">
						<ItemDisplay
							weapon={selectedWeapon}
							userData={userData}
							materials={materials}
						/>
					</div>
				</div>

				{/* Bottom section - Table */}
				<div className="w-full">
					{weapons && materials && userData && (
						<DataTableContainer
							weapons={weapons}
							filters={{
								profession: userData.profession,
								maxLevel: userData.targetLevel ?? null
							}}
							calculationInputs={{
								materials: materials,
								neededXp: userData.neededXp
							}}
							onSelectWeapon={onWeaponSelected}
							selectedWeapon={selectedWeapon}
						/>
					)}
					{(!weapons || !materials) && (
						<DataTableSkeleton/>
					)

					}
				</div>
			</div>

		</div>
	);
}

export default App

function ItemDisplay({weapon, materials, userData}: {
	weapon: Weapon | null,
	materials: Map<string, Material> | undefined,
	userData: UserData | null
}) {
	const metric = useMemo(() => {
		if (!weapon || !materials || !userData) return null;
		const totalXp = resolveClassic(weapon, materials)
		const crafts = userData.neededXp / totalXp
		return calculateCraftingMetrics(weapon, crafts, materials);
	}, [weapon, materials, userData])

	if (!weapon || !materials || !userData || !metric) return <WeaponCardSkeleton/>
	// if (!weapon) return <div className="p-4 text-gray-500">Select a weapon to view details</div>;

	if (!materials) {
		throw new Error("literally impossible code")
	}
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<WeaponCard
				weapon={weapon}
				materials={materials}
				calculations={{
					totalXp: resolveTotalXp(weapon, materials)
				}}
			/>
			<MetricsCard metrics={metric} showPurchased={userData} materials={materials} />
		</div>
	);
}

// Loading state component for reusability
const LoadingState = ({isPending, isFetching, errors}: {
	isPending: boolean;
	isFetching: boolean;
	errors: Error[] | null;
}) => {
	if (isPending) return <div className="p-4">Loading...</div>;
	if (isFetching) return <div className="p-4">Fetching...</div>;
	if (errors && errors.length > 0) {
		return (
			<div className="p-4 text-red-500">
				<p>An error has occurred:</p>
				<ul className="list-disc pl-5">
					{errors.map((error, index) => (
						<li key={index}>{error.message}</li>
					))}
				</ul>
			</div>
		);
	}
	return null;
};



