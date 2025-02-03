import {Weapon} from "@/domain/models/weapon.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

export function WeaponCard({weapon, totalXp}: { weapon: Weapon, totalXp: number }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{weapon.variant ?? "dave"}<br/>
					{weapon.name}
				</CardTitle>
				<CardDescription>{weapon.faction}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center space-y-4">
				<Avatar className="h-24 w-24">
					<AvatarImage src={weapon.imageUrl} alt="Image"/>
					<AvatarFallback>ImageError</AvatarFallback>
				</Avatar>
				<div className="w-full text-left">

					{weapon.profession} XP: {weapon.xp}({totalXp})<br/>
					KP: {weapon.kp}<br/>
					Level: {weapon.level} - {weapon.levelMax}<br/>
				</div>
				{weapon.recipe.materials.map(material => (
					<WeaponMaterialRow key={material.materialName} material={material}/>
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

interface WeaponMaterialRowProps {
	material: { materialName: string; quantity: number }
}

export function WeaponMaterialRow({material}: WeaponMaterialRowProps) {
	return (
		<div>{material.materialName}: {material.quantity}</div>
	)
}