import copperCoin from "@/assets/Copper_coin.png"
import silverCoin from "@/assets/Silver_coin.png"
import goldCoin from "@/assets/Gold_coin.png"
import platinumCoin from "@/assets/Platinum_coin.png"

export function Currency({amount = 0}: { amount: number }) {
	// Convert to absolute value for calculations, keep sign for display
	const isNegative = amount < 0;
	const absAmount = Math.abs(amount);

	// Calculate denominations
	const copper = absAmount % 1000;
	const silver = Math.floor(absAmount / 1000) % 1000;
	const gold = Math.floor(absAmount / 1000000) % 1000;
	const platinum = Math.floor(absAmount / 1000000000);

	// Helper to render a coin with its image
	function CoinDisplay({value, type}: { value: number, type: string }) {
		if (!value) return null;
		return (
			<span className="inline-flex items-center space-x-1">
				<span>{value}</span>
				<img
					src={type}
					alt={`${type} coin`}
					className="w-4 h-4 inline-block"
				/>
			</span>
		);
	}

	return (
		<div className={`inline-flex items-center space-x-2 ${isNegative ? "text-red-500" : ""}`}>
			{platinum > 0 && (
				<>
					<CoinDisplay value={platinum} type={platinumCoin}/>
				</>
			)}
			{gold > 0 && (
				<>
					<CoinDisplay value={gold} type={goldCoin}/>
				</>
			)}
			{silver > 0 && (
				<>
					<CoinDisplay value={silver} type={silverCoin}/>
				</>
			)}
			{(copper > 0 || (!platinum && !gold && !silver)) && (
				<CoinDisplay value={copper} type={copperCoin}/>
			)}
		</div>
	);
}