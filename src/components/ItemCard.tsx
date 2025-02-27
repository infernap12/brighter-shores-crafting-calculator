import {Product} from "@/domain/models/product.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Material} from "@/domain/models/material.ts";
import {Currency} from "@/components/fantasy-currency.tsx";

export function ItemCard({product, calculations, materials}: {
	product: Product,
	calculations: { totalXp: number },
	materials: Map<string, Material>
}) {
	console.log(product)
	return (
		<Card>
			<CardHeader>
				<a href={product.link} target="_blank" rel="noopener noreferrer">
					<CardTitle className="text-center">
						{product.variantName ?? "super"}<br/>
						{product.variantOf ?? "base name"}
					</CardTitle>
				</a>
				<CardDescription className="text-center">{product.faction}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center space-y-4">
				<Avatar className="h-24 w-24">
					<AvatarImage src={product.imageUrl} alt="Image"/>
					<AvatarFallback>ImageError</AvatarFallback>
				</Avatar>
				<div className="w-full text-left">

					{product.profession} XP: {product.xp}({calculations.totalXp})<br/>
					KP: {product.kp}%<br/>
					Level: {product.level} - {product.levelMax}<br/>
				</div>
				{product.recipe.materials.map(wepMat => (
					<MaterialRow
						key={wepMat.materialName}
						material={materials.get(wepMat.materialName)!}
						quantity={product.passive ? wepMat.quantity * 200 : wepMat.quantity}
					/>
				))}
				<div>
					Facility: {product.recipe.facility}
				</div>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p>{product.description}</p>
			</CardFooter>
		</Card>
	)
}

export function MaterialRow({material, quantity}: { material: Material, quantity: number }) {
	return (
		<div className="flex items-center gap-2 w-full">
			<Avatar className="h-8 w-8">
				<AvatarImage src={material.imageUrl} alt="Image"/>
				<AvatarFallback>ImageError</AvatarFallback>
			</Avatar>
			<div className="flex w-full">
				<div className="flex-1">{material.name}</div>
				<div className="w-24">Qty: {quantity}</div>
				<div className="w-24"><Currency amount={material.cost * quantity}/></div>
			</div>
		</div>
	)
}