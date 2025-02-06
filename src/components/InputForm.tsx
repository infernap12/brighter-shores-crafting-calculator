import {Profession} from "@/profession.ts";
import {z} from "zod";
import {getLevelForXp, getXpForLevel} from "@/lib/utils.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch.tsx";

const formSchema = z.object({
	profession: z.nativeEnum(Profession),
	isPrimaryPurchased: z.boolean(),
	isPlankPurchased: z.boolean(),
	isLogPurchased: z.boolean(),
	useManualSellPrice: z.boolean(),
	itemLevel: z.number().positive("Level must be greater than 0"),
	currentLevel: z.number()
		.nullable()
		.refine(
			(val) => {
				// console.log("Refining value:", val);
				return val === null || (val >= 1 && val <= 500);
			},
			"Level must be between 1 and 500"
		),
	targetLevel: z.number()
		.nullable()
		.refine(
			(val) => val === null || (val >= 1 && val <= 500),
			"Level must be between 1 and 500"
		),
	currentXP: z.number()
		.nullable()
		.refine(
			(val) => val === null || (val >= 0 && val <= 1861867989),
			"Xp must be between 0 and 1,861,867,989"
		),
	targetXP: z.number()
		.nullable()
		.refine(
			(val) => val === null || (val >= 0 && val <= 1861867989),
			"Xp must be between 0 and 1,861,867,989"
		),
}).refine(
	(data) => {
		const hasCurrentValue = data.currentLevel !== null || data.currentXP !== null;
		const hasTargetValue = data.targetLevel !== null || data.targetXP !== null;
		return hasCurrentValue && hasTargetValue;
	},
	{
		message: "You must provide either level or XP for both current and target values"
	}
).refine(
	(data) => {
		const currentXp = data.currentXP !== null
			? data.currentXP
			: (data.currentLevel !== null ? getXpForLevel(data.currentLevel) : 0);

		const targetXp = data.targetXP !== null
			? data.targetXP
			: (data.targetLevel !== null ? getXpForLevel(data.targetLevel) : 0);

		return targetXp > currentXp;
	},
	{
		message: "Target XP must be greater than current XP"
	}
)

export type InputFormValues = z.infer<typeof formSchema>;

export function InputForm({onChange}: { onChange: (input: InputFormValues) => void }) {
	const form = useForm<InputFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			profession: Profession.Stonemason,
			isPrimaryPurchased: false,
			isPlankPurchased: false,
			isLogPurchased: false,
			useManualSellPrice: false,
			itemLevel: 1,
			currentLevel: 1,
			targetLevel: 10,
			currentXP: undefined,
			targetXP: undefined,

		},
	})


	const currentLevel = form.watch("currentLevel");
	const currentXP = form.watch("currentXP");
	const targetLevel = form.watch("targetLevel");
	const targetXP = form.watch("targetXP");
	const profession = form.watch("profession");

	useEffect(() => {
		const updateFormValues = () => {
			const values = form.getValues();

			{
				const currentXp = values.currentXP !== null
					? values.currentXP
					: (values.currentLevel !== null ? getXpForLevel(values.currentLevel) : 0);

				const targetXp = values.targetXP !== null
					? values.targetXP
					: (values.targetLevel !== null ? getXpForLevel(values.targetLevel) : 0);

				if (targetXp <= currentXp) {
					const newLevel = getLevelForXp(currentXp) + 1;
					form.resetField("targetLevel", {defaultValue: newLevel})
					form.resetField("targetXP", {defaultValue: getXpForLevel(newLevel)})
				}
			}

			// Update current XP/level pair
			if ((currentLevel !== null && currentXP == null) || form.getFieldState("currentLevel").isDirty) {
				form.resetField("currentXP", {defaultValue: getXpForLevel(currentLevel!)});
				form.resetField("currentLevel",{defaultValue: currentLevel})
			} else if ((currentXP !== null && currentLevel == null) || form.getFieldState("currentXP").isDirty) {
				form.resetField("currentLevel", {defaultValue: getLevelForXp(currentXP!)});
				form.resetField("currentXP", {defaultValue: currentXP})
			}

			// Update target XP/level pair
			if ((targetLevel !== null && targetXP == null) || form.getFieldState("targetLevel").isDirty) {
				form.resetField("targetXP", {defaultValue: getXpForLevel(targetLevel!)});
				form.resetField("targetLevel",{defaultValue: targetLevel})
			} else if ((targetXP !== null && targetLevel == null) || form.getFieldState("targetXP").isDirty) {
				form.resetField("targetLevel", {defaultValue: getLevelForXp(targetXP!)});
				form.resetField("targetXP", {defaultValue: targetXP})
			}


			// Only trigger parent onChange if we have all required values
			if (values.profession !== undefined &&
				values.isPrimaryPurchased !== undefined &&
				values.isPlankPurchased !== undefined &&
				values.isLogPurchased !== undefined &&
				values.useManualSellPrice !== undefined &&
				values.itemLevel !== undefined) {
				onChange(values);
			}
			void form.trigger();
		};

		updateFormValues();
	}, [currentLevel, currentXP, targetLevel, targetXP, profession, form]);

	return (
		<Form {...form}>
			<form className="space-y-6">
				{/* Profession Selection */}
				<FormField
					control={form.control}
					name="profession"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Profession</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a profession" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[Profession.Blacksmith, Profession.Stonemason, Profession.Bonewright].map((prof) => (
										<SelectItem key={prof} value={prof}>
											{prof}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Purchase Options */}
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="isPrimaryPurchased"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>
										Purchase Primary Material
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="useManualSellPrice"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>
										Use Manual Sell Price
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isPlankPurchased"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>
										Purchase Planks
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isLogPurchased"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>
										Purchase Logs
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>
				</div>

				{/* Item Level */}
				<FormField
					control={form.control}
					name="itemLevel"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Item Level</FormLabel>
							<FormControl>
								<Input
									type="number"
									{...field}
									onChange={e => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Level and XP Inputs */}
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="currentLevel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current Level</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={field.value ?? 0}
											onChange={e => {
												// void form.trigger()
												return field.onChange(Number(e.target.value) || 0)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="currentXP"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current XP</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={field.value ?? ''}
											onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="targetLevel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Target Level</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={field.value ?? ''}
											onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="targetXP"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Target XP</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={field.value ?? ''}
											onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</form>
		</Form>

	);
}