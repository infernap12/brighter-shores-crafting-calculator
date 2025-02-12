import {Product} from "@/domain/models/product.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Material} from "@/domain/models/material.ts";

export function WeaponCard({weapon, calculations, materials}: {
	weapon: Product,
	calculations: { totalXp: number },
	materials: Map<string, Material>
}) {
	console.log(weapon)
	return (
		<Card>
			<CardHeader>
				<a href={weapon.link} target="_blank" rel="noopener noreferrer">
					<CardTitle>
						{weapon.variant ?? "dave"}<br/>
						{weapon.name}
					</CardTitle>
				</a>
				<CardDescription>{weapon.faction}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center space-y-4">
				<Avatar className="h-24 w-24">
					<AvatarImage src={weapon.imageUrl} alt="Image"/>
					<AvatarFallback>ImageError</AvatarFallback>
				</Avatar>
				<div className="w-full text-left">

					{weapon.profession} XP: {weapon.xp}({calculations.totalXp})<br/>
					KP: {weapon.kp}%<br/>
					Level: {weapon.level} - {weapon.levelMax}<br/>
				</div>
				{weapon.recipe.materials.map(wepMat => (
					<WeaponMaterialRow
						key={wepMat.materialName}
						material={materials.get(wepMat.materialName)!}
						quantity={wepMat.quantity}
					/>
				))}
				<div>
					Facility: {weapon.recipe.facility}
				</div>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p>{weapon.description}</p>
			</CardFooter>
		</Card>
	)
}

export function WeaponMaterialRow({material, quantity}: { material: Material, quantity: number }) {
	return (
		<div className="flex items-center gap-2 w-full">
			<Avatar className="h-8 w-8">
				<AvatarImage src={material.imageUrl} alt="Image"/>
				<AvatarFallback>ImageError</AvatarFallback>
			</Avatar>
			<div className="flex w-full">
				<div className="flex-1">{material.name}</div>
				<div className="w-24">Qty: {quantity}</div>
				<div className="w-24">Cost: {material.cost * quantity}</div>
			</div>
		</div>
	)
}