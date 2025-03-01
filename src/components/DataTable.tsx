import {useEffect} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ceil} from "@/lib/utils.ts";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {useProductXPCalculations, XPCalculationInputs} from "@/hooks/useProductXPCalculations.ts";
import {ProductFilters, useFilteredProducts} from "@/hooks/useFilteredProducts.ts";
import {Product} from "@/domain/models/product.ts";
import {UserData} from "@/App.tsx";


export function DataTableContainer(
	{
		products,
		filters,
		calculationInputs,
		onSelectProduct,
		selectedProduct,
		isNonReady,
		userData
	}: {
		products: Map<string, Product>,
		filters: ProductFilters,
		calculationInputs: XPCalculationInputs,
		onSelectProduct: (product: Product) => void,
		selectedProduct: Product | null,
		isNonReady: boolean,
		userData?: UserData
	}
) {
	console.log("Pre filtered products:", products);

	const filteredProducts = useFilteredProducts(products, filters);
	console.log("Filtered products:", filteredProducts);
	useEffect(() => {
		const isProductFound = filteredProducts.find(w => w.name === selectedProduct?.name);
		if (filteredProducts.length > 0 && !isProductFound) {
			onSelectProduct(filteredProducts[0]);
		}
	}, [filteredProducts, onSelectProduct, selectedProduct?.name]);

	if (filteredProducts.length === 0) {
		return <div className="p-4 text-center">No products </div>;
	}

	return (
		<ProductTable
			userData={userData}
			products={filteredProducts}
			calculationInputs={calculationInputs}
			onSelectProduct={onSelectProduct}
			isNonReady={isNonReady}
		/>
	);
}

function ProductTable(
	{
		products,
		calculationInputs,
		onSelectProduct,
		isNonReady,
		userData
	}: {
		products: Product[],
		calculationInputs: XPCalculationInputs,
		onSelectProduct: (product: Product) => void,
		isNonReady: boolean,
		userData?: UserData
	}
) {

	const productXpResults = useProductXPCalculations(products, calculationInputs, isNonReady);

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
					products
						.map((product: Product) => {
							const totalXp = productXpResults.get(product.fullName);
							const isAboveLevel = (userData?.currentLevel ?? Infinity) < product.level;
							if (totalXp === undefined) {
								return null;
							}
							const craftsNeeded = ceil(calculationInputs.neededXp / totalXp);
							return (
								<TableRow
									key={product.fullName}
									className={`cursor-pointer ${isAboveLevel ? "bg-yellow-100 hover:bg-yellow-200" : "hover:bg-gray-100"}`}
									onClick={() => onSelectProduct(product)}
								>
									<TableCell>
										<Avatar>
											<AvatarImage
												src={product.imageUrl}
												alt={product.name}
											/>
										</Avatar>
									</TableCell>
									<TableCell>{product.level}</TableCell>
									<TableCell>{product.fullName}</TableCell>
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