import {cn} from "@/lib/utils.ts";

interface NetworkNodeProp {
	name: string;
	isPending: boolean;
	isFetching: boolean;
}

export function NetworkStatus({queries}: { queries: NetworkNodeProp[] }) {
	return (
		<div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 text-xs text-white p-2 flex gap-4 z-10">
			{queries.map(({name, isPending, isFetching}) => (
				<div key={name} className="flex items-center gap-2">
					<span>{name}:</span>
					<div className="flex gap-1">
						<div
							className={cn(
								"w-2 h-2 rounded-full",
								isPending ? "bg-red-500" : "bg-green-500"
							)}
						/>
						<div
							className={cn(
								"w-2 h-2 rounded-full",
								isFetching ? "bg-amber-500 [animation:pulse_150ms_cubic-bezier(0,0,0.2,1)_infinite]" : "bg-amber-900"
							)}
						/>
					</div>
				</div>
			))}

			<div className="ml-auto">
				<a
					href="https://www.mozilla.org/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-400 hover:underline"
				>
					Built for Firefox ❤️ with love
				</a>
			</div>
		</div>
	);
}