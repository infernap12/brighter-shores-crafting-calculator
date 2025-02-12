import {CraftingMetrics} from "@/services/crafting-calculator.ts";
import {UserData} from "@/App.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Material} from "@/domain/models/material.ts";

export function MetricsCard({metrics, userData, materials}: {
	metrics: CraftingMetrics,
	userData: UserData,
	materials: Map<string, Material>
}) {
	console.log(userData)
	const showPurchased = userData.isPrimaryPurchased;
	return (
		<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
			<h3 className="font-semibold mb-4">Crafting Summary</h3>

			{/* Profession Totals */}
			<div className="space-y-2 mb-4">
				<h4 className="text-sm font-medium">Profession Totals</h4>
				{Array.from(metrics.professionTotals.entries()).map(([profession, stats]) => (
					<div key={profession} className="flex justify-between text-sm">
						<span>{profession}</span>
						<span>XP: {stats.xp.toLocaleString()} | KP: {stats.kp.toFixed()}%</span>
					</div>
				))}
			</div>

			{/* Material Balances */}

			{/* Material Balances */}
			<div className="space-y-2">
				<h4 className="text-sm font-medium">Material Requirements</h4>
				{Array.from(metrics.materialBalances.entries())
					.filter((balanceEntry) => balanceEntry[1].required > 0)
					.map(([name, balance]) => {
						const material = materials.get(name)!;
						const time = balance.produced * material.duration
						return(

							<div key={material.name} className="grid grid-cols-4 items-center text-sm gap-4">
								<div className="flex items-center justify-start col-span-2">
									{/* Avatar for the material */}
									<Avatar className="w-6 h-6 mr-2">
										<AvatarImage
											src={material.imageUrl}
											alt={material.name}
										/>
									</Avatar>
									<span>{material.name}</span>
								</div>
								<span className="text-center">Craft: {balance.produced.toFixed()}</span>
								{material.recipe || material.activity ? (
									<span className="text-right">
										{new Date(time * 1000).toISOString().slice(11, 19) /* Formats as HH:mm:ss */}
									</span>
								) : (
									<span className="text-right">
										Cost: {((showPurchased ? material.value : material.cost) * balance.produced).toLocaleString()}
									</span>
								)}
							</div>
						)
					})}
			</div>

			{/* Totals */}
			<div className="mt-4 pt-4 border-t">
				<div className="flex justify-between text-sm font-medium">
					<span>Total Duration:</span>

					<span>
						{new Date(metrics.totalDuration * 1000)
							.toISOString()
							.slice(11, 19) /* Formats as HH:mm:ss */}
					</span>
				</div>
				<div className="flex justify-between text-sm font-medium">
					<span>Total XP:</span>
					<span>{metrics.totalXp.toLocaleString()}</span>
				</div>
				<div className="flex justify-between text-sm font-medium">
					<span>Total KP:</span>
					<span>{metrics.totalKp.toLocaleString()}</span>
				</div>
			</div>
		</div>
	);
}
