import {Skeleton} from "@/components/ui/skeleton";


export function WeaponCardSkeleton() {
	return (
		<div className="rounded-lg border p-4 space-y-4 max-w-sm">
			<div className="text-center space-y-1">
				<Skeleton className="h-6 w-32 mx-auto"/>
				<Skeleton className="h-4 w-24 mx-auto"/>
			</div>

			<div className="flex justify-center">
				<Skeleton className="h-16 w-16 rounded-full"/>
			</div>

			<div className="space-y-2">
				<Skeleton className="h-4 w-40"/>
				<Skeleton className="h-4 w-16"/>
				<Skeleton className="h-4 w-24"/>
			</div>

			<div className="space-y-2 text-center">
				<Skeleton className="h-4 w-48 mx-auto"/>
				<Skeleton className="h-4 w-40 mx-auto"/>
			</div>

			<div>
				<Skeleton className="h-4 w-10/12 mx-auto"/>
			</div>

			<Skeleton className="h-16 w-9/12 mx-auto"/>
		</div>
	);
}

export function DataTableSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between">
				<Skeleton className="h-10 w-[250px]"/>
				<Skeleton className="h-10 w-[200px]"/>
			</div>
			<div className="border rounded-lg">
				{[1, 2, 3, 4, 5].map((_, i) => (
					<div key={i} className="flex gap-4 p-4 border-b last:border-0">
						<Skeleton className="h-6 w-[40%]"/>
						<Skeleton className="h-6 w-[30%]"/>
						<Skeleton className="h-6 w-[30%]"/>
					</div>
				))}
			</div>
		</div>
	);
}

export function InputFormSkeleton() {
	return (
		<div className="space-y-6 max-w-xl">
			<div>
				<Skeleton className="h-4 w-20 mb-2"/>
				<Skeleton className="h-10 w-full rounded-md"/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="flex items-center gap-3">
						<Skeleton className="h-6 w-10 rounded-full"/>
						<Skeleton className="h-4 flex-1"/>
					</div>
				))}
			</div>

			<div>
				<Skeleton className="h-4 w-20 mb-2 mx-auto"/>
				<Skeleton className="h-10 w-full rounded-md"/>
			</div>
			{[1, 2].map(
				(i) => {
					return (
						<div key={i} className="grid grid-cols-2 gap-6">
							{[1, 2].map((i) => (
								<div key={i}>
									<Skeleton className="h-4 w-24 mb-2 mx-auto"/>
									<Skeleton className="h-10 w-full rounded-md"/>
								</div>
							))}
						</div>
					)
				}
			)}
		</div>
	);
}
