import {ItemCard} from "@/components/ItemCard.tsx";
import {Product} from "@/domain/models/product.ts";
import {resolveTotalXp} from "@/domain/services/calculatorService.ts";
import {useEffect, useMemo, useState} from 'react';
import {Material} from "@/domain/models/material.ts";
import {InputForm, InputFormValues} from "@/components/InputForm.tsx";
import {DataTableContainer} from "@/components/DataTable.tsx";
import {Profession, professionProperties, ProfessionSetting} from "@/profession.ts";
import {DataTableSkeleton, ItemCardSkeleton} from "@/components/skeleton-loaders.tsx";
import {ceil, getXpForLevel, getXpForLevelAndRemaining} from "@/lib/utils.ts";
import {calculateCraftingMetrics} from "@/services/crafting-calculator.ts";
import {NetworkStatus} from "@/components/NetworkStatus.tsx";
import {MetricsCard} from "@/components/MetricsCard.tsx";
import {useMaterialService} from "@/services/materialService.ts";
import {AssociatedProfessionsForm} from "@/components/ProfessionInputs.tsx";
import {useProfessionSettings} from "@/hooks/useProfessionSettings.ts";


export interface UserData extends InputFormValues {
	currentXp: number;
	targetXP: number;
	neededXp: number;
}


function App() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const {
		allMaterials: materials,
		associatedProfessions,
		allMaterialsQuery,
		productsQuery: productsQuery,
		isNonReady,
	} = useMaterialService(userData?.profession ?? Profession.Stonemason, userData?.passive ?? false);
	const products = productsQuery?.data;
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


	const [professionSettings, setProfessionSettings] = useProfessionSettings();

	console.log("Profession Settings:", professionSettings)
	// todo
	// const [craftMetrics, setCraftMetrics] = useState<CraftingMetrics | null>(null);
	// Set default selected weapon when products are loaded
	useEffect(() => {
		if (products && Array.from(products.values()).length > 0 && !selectedProduct) {
			setSelectedProduct(Array.from(products.values())[0]);
		}
	}, [products,]);

	function onChange(inputs: InputFormValues) {
		const userData = inputs as UserData;
		userData.currentXp = getXpForLevelAndRemaining(userData.currentLevel, userData.xpToNextLevel);
		userData.targetXP = getXpForLevel(userData.targetLevel);
		userData.neededXp = userData.targetXP - userData.currentXp;
		if (selectedProduct && (userData.profession !== selectedProduct.profession || userData.passive !== selectedProduct.passive)) {
			setSelectedProduct(null);
		}
		setUserData(userData);
	}

	function onProductSelected(product: Product) {
		const crafts = ceil((userData?.neededXp ?? 0) / resolveTotalXp(product, materials)) ?? 12
		console.log("Calculating metrics! Hold onto ya buts!", crafts, product)
		setSelectedProduct(product)
	}

	const productString = (() => {
		if (associatedProfessions[0] in professionProperties) {
			return professionProperties[associatedProfessions[0] as keyof typeof professionProperties].outputCategory;
		}
	})()

	return (
		<>
			<div className="container mx-auto p-4">
				<NetworkStatus
					queries={[
						...(productsQuery ? [{
							name: `${productString}`,
							isPending: productsQuery.isPending,
							isFetching: productsQuery.isFetching
						}] : []),
						...associatedProfessions.map((profession, index) => ({
							name: `${profession} Materials`,
							isPending: allMaterialsQuery[index].isPending,
							isFetching: allMaterialsQuery[index].isFetching
						}))
					]}
				/>
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
							{/* Only show associated professions form when we have discovered professions */}
							{associatedProfessions.length > 1 && (
								<AssociatedProfessionsForm
									associatedProfessions={associatedProfessions.filter(p => p !== userData?.profession)}
									onChange={setProfessionSettings}
									initialSettings={professionSettings}
								/>
							)}

						</div>

						{/* Card - between form and table on mobile, right side on md+ */}
						<div className="w-full md:w-2/3 order-3 md:order-2">
							<ItemDisplay
								item={selectedProduct}
								userData={userData}
								materials={materials}
								isNonReady={isNonReady}
								professionSettings={professionSettings}
							/>

						</div>
					</div>

					{/* Bottom section - Table */}
					<div className="w-full">
						{!isNonReady && products && materials && userData && (
							<DataTableContainer
								userData={userData}
								products={products}
								filters={{
									profession: userData.profession,
									maxLevel: userData.targetLevel ?? 500
								}}
								calculationInputs={{
									materials: materials,
									neededXp: userData.neededXp
								}}
								onSelectProduct={onProductSelected}
								selectedProduct={selectedProduct}
								isNonReady={isNonReady}
							/>
						)}
						{(!products || !materials || isNonReady) && (
							<DataTableSkeleton/>
						)}
					</div>
				</div>

			</div>
		</>
	);
}

export default App

function ItemDisplay({item, materials, userData, isNonReady, professionSettings}: {
	item: Product | null,
	materials: Map<string, Material> | null,
	userData: UserData | null,
	isNonReady: boolean,
	professionSettings: Map<Profession, ProfessionSetting>
}) {
	const metric = useMemo(() => {
		if (!item || !materials || !userData || isNonReady) return null;
		console.log(isNonReady)
		const totalXp = resolveTotalXp(item, materials)
		const quantity = userData.neededXp / (totalXp / item.recipe.outputQuantity)
		console.group("Calculating metrics!");
		console.log("Item:", item);
		console.log("Materials:", materials);
		console.log("UserData:", userData);
		console.log("IsNonReady:", isNonReady);
		console.log("ProfessionSettings:", professionSettings);
		console.log("TotalXp:", totalXp);
		console.log("Quantity:", quantity);
		console.groupEnd();
		return calculateCraftingMetrics(item, quantity, professionSettings, materials);
	}, [item, materials, userData, isNonReady, professionSettings])

	if (!item || !materials || !userData || !metric || isNonReady) return <ItemCardSkeleton/>
	// if (!weapon) return <div className="p-4 text-gray-500">Select a weapon to view details</div>;

	if (!materials) {
		throw new Error("literally unreachable code")
	}
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<ItemCard
				product={item}
				materials={materials}
				calculations={{
					totalXp: resolveTotalXp(item, materials)
				}}
			/>
			<MetricsCard
				metrics={metric}
				userData={userData}
				materials={materials}
				professionSettings={professionSettings}
			/>
		</div>
	);
}


