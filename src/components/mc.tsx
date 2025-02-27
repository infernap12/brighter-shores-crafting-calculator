import {CraftingMetrics} from "@/services/crafting-calculator.ts";
import {UserData} from "@/App.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Material} from "@/domain/models/material.ts";
import {Profession, ProfessionSetting} from "@/profession.ts";
import {Time} from "@/components/time.tsx";
import {Currency} from "@/components/fantasy-currency.tsx";

export function MetricsCard({metrics, materials}: {
	metrics: CraftingMetrics,
	userData: UserData,
	materials: Map<string, Material>,
	professionSettings: Map<Profession, ProfessionSetting>
}) {
	// Use the costs from the metrics.materialBalances
	const totalCost = Array.from(metrics.materialBalances.entries())
		.reduce((sum, [, balance]) => {
			return sum + (balance.totalCost ?? 0);  // Use totalCost, default to 0 if undefined
		}, 0);


	return (
		<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
			<h2 className="text-xl font-semibold mb-4">Crafting Summary</h2>

			{/* Profession Totals */}
			<div className="space-y-2 mb-4">
				<h3 className="text-base font-medium mb-2">Profession Totals</h3>
				{Array.from(metrics.professionTotals.entries()).map(([profession, stats]) => (
					<div key={profession} className="flex justify-between text-sm">
						<span>{profession}</span>
						<span>XP: {stats.xp.toLocaleString()} | KP: {stats.kp.toFixed()}%</span>
					</div>
				))}
			</div>

			{/* Material Balances */}
			<div className="space-y-2">
				<h3 className="text-base font-medium mb-2">Material Requirements</h3>
				{/* Column Headers */}
				<div className="grid grid-cols-7 items-center text-sm gap-4 font-medium">
					<div className="col-span-3">Material</div>
					<span className="text-center">lv</span>
					<span className="text-center">Amount</span>
					<span className="text-right col-span-2">Cost/Time</span>
				</div>
				{Array.from(metrics.materialBalances.entries())
					.filter((balanceEntry) => balanceEntry[1].required > 0)
					.map(([name, balance]) => {
						const material = materials.get(name)!;
						const time = balance.batches * material.duration;
						return (

							<div key={material.name} className="grid grid-cols-7 items-center text-sm gap-4">
								<div className="flex items-center justify-start col-span-3">
									{/* Avatar for the material */}
									<Avatar className="w-6 h-6 mr-2">
										<AvatarImage
											src={material.imageUrl}
											alt={material.name}
										/>
									</Avatar>
									<span>{material.name}</span>
								</div>
								<span className="text-center">{material.level}</span>
								<span className="text-center">{Number((balance.produced).toFixed(3))}</span>
								{balance.totalCost ? (
									<span className="text-right col-span-2">
										<Currency amount={Math.round(balance.totalCost)}/>
									</span>
								) : (
									<span className="text-right col-span-2">
										<Time seconds={time}/>
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
						<Time seconds={metrics.totalDuration}/>
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
				<div className="flex justify-between text-sm font-medium">
					<span>Total Cost:</span>
					<span><Currency amount={Math.round(totalCost)}/></span>
				</div>
			</div>
		</div>
	)
}
