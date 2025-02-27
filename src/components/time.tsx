export function Time({seconds, showDays = true, showSeconds = true}: {
	seconds: number,
	showDays?: boolean,
	showSeconds?: boolean
}) {
	if (!Number.isFinite(seconds)) {
		return <span>Invalid time</span>;
	}

	const days = Math.floor(seconds / 86400);
	const timeString = (() => {
		try {
			return new Date(seconds * 1000).toISOString().slice(11, 19);
		} catch (error) {
			console.error("Failed to format time:", {seconds, error});
			return "Invalid time";
		}
	})();

	// If we don't want to show seconds, remove them from the time string
	let formattedTime = showSeconds ? timeString : timeString.slice(0, 5);
	// If hours are 00, remove them from the display
	if ((!showDays || days === 0) && formattedTime.startsWith('00:')) {
		formattedTime = formattedTime.slice(3);
	}



	return (
		<span className="font-mono">
			{showDays && days > 0 ? `${days}D ` : ''}{formattedTime}
		</span>
	);
}