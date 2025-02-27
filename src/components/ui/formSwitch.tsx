import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface FormSwitchProps extends React.ComponentPropsWithoutRef<typeof Switch> {
	label?: string
}

const FormSwitch = React.forwardRef<
	React.ElementRef<typeof Switch>,
	FormSwitchProps
>(({ className, label, ...props }, ref) => {
	return (
		<div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2">
			{label && <span className="text-sm">{label}</span>}
			<Switch
				ref={ref}
				className={cn(
					"data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
					className
				)}
				{...props}
			/>
		</div>
	);
});
FormSwitch.displayName = "FormSwitch";

export {FormSwitch};