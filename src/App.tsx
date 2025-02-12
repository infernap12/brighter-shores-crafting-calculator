import {WeaponCard} from "@/components/WeaponCard.tsx";
import {Product} from "@/domain/models/product.ts";
import {resolveClassic, resolveTotalXp} from "@/domain/services/calculatorService.ts";
import {useEffect, useMemo, useState} from 'react';
import {Material} from "@/domain/models/material.ts";
import {InputForm, InputFormValues} from "@/components/InputForm.tsx";
import {DataTableContainer} from "@/components/DataTable.tsx";
import {Profession} from "@/profession.ts";
import {DataTableSkeleton, WeaponCardSkeleton} from "@/components/skeleton-loaders.tsx";
import {ceil} from "@/lib/utils.ts";
import {calculateCraftingMetrics} from "@/services/crafting-calculator.ts";
import {NetworkStatus} from "@/components/NetworkStatus.tsx";
import {MetricsCard} from "@/components/mc.tsx";
import {useMaterialService} from "@/services/materialService.ts";


export interface UserData extends InputFormValues {
	neededXp: number;
}



function App() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const {
		allMaterials: materials,
		associatedProfessions,
		isFetching,
		isPending,
		productsQuery: productsQuery,
		queryStatuses: queryStatuses,
		isNonReady,
	} = useMaterialService(userData?.profession ?? Profession.Stonemason);
	const weapons = productsQuery?.data;
	const [selectedWeapon, setSelectedWeapon] = useState<Product | null>(null);
	// todo
	// const [craftMetrics, setCraftMetrics] = useState<CraftingMetrics | null>(null);
	// Set default selected weapon when weapons are loaded
	useEffect(() => {
		if (weapons && Array.from(weapons.values()).length > 0 && !selectedWeapon) {
			setSelectedWeapon(Array.from(weapons.values())[0]);
		}
	}, [weapons, ]);

	function onChange(inputs: InputFormValues) {
		const userData = inputs as UserData;
		// The cross-calculations are now handled in the InputForm component
		userData.neededXp = (userData.targetXP ?? 0) - (userData.currentXP ?? 0);
		if (selectedWeapon && userData.profession !== selectedWeapon.profession) {
			setSelectedWeapon(null);
		}
		setUserData(userData);
	}

	function onWeaponSelected(weapon: Product) {
		const crafts = ceil((userData?.neededXp ?? 0) / resolveTotalXp(weapon, materials)) ?? 12
		console.log("Calculating metrics! Hold onto ya buts!", crafts, weapon)
		setSelectedWeapon(weapon)
	}

	return (
		<>
			<div className="container mx-auto p-4">
				<NetworkStatus queries={[
					// {
					// 	name: "Weapons",
					// 	isPending: isPendingW,
					// 	isFetching: isFetchingW
					// },
					{
						name: "Materials",
						isPending: isPending,
						isFetching: isFetching
					},
					// {
					// 	name: "Materials Service",
					// 	isPending: isNonReady,
					// 	isFetching: isNonReady
					// }
				]}/>
				{/*<LoadingState*/}
				{/*	isPending={isPending}*/}
				{/*	isFetching={isFetching}*/}
				{/*	errors={[errorW, errorM].filter((it) => it !== null)}/>*/}


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
								isNonReady={isNonReady}
							/>

						</div>
					</div>

					{/* Bottom section - Table */}
					<div className="w-full">
						{!isNonReady && weapons && materials && userData && (
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
								isNonReady={isNonReady}
							/>
						)}
						{(!weapons || !materials || isNonReady) && (
							<DataTableSkeleton/>
						)}
					</div>
				</div>

			</div>
		</>
	);
}

export default App

function ItemDisplay({weapon, materials, userData, isNonReady}: {
	weapon: Product | null,
	materials: Map<string, Material> | null,
	userData: UserData | null,
	isNonReady: boolean
}) {
	const metric = useMemo(() => {
		if (!weapon || !materials || !userData || isNonReady) return null;
		console.log(isNonReady)
		console.log("Calculating metrics!", weapon, materials, userData, isNonReady)
		const totalXp = resolveClassic(weapon, materials)
		const crafts = userData.neededXp / totalXp
		return calculateCraftingMetrics(weapon, crafts, materials);
	}, [weapon, materials, userData, isNonReady])

	if (!weapon || !materials || !userData || !metric || isNonReady) return <WeaponCardSkeleton/>
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
			<MetricsCard metrics={metric} userData={userData} materials={materials}/>
		</div>
	);
}


