import {Profession} from "@/profession.ts";
import {z} from "zod";
import {getXpForLevel} from "@/lib/utils.ts";
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
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FormSwitch} from "@/components/ui/formSwitch.tsx";

const formSchema = z.object({
	profession: z.nativeEnum(Profession),
	passive: z.boolean().default(false),
	currentLevel: z.number()
		.refine(
			(val) => {
				// console.log("Refining value:", val);
				return val === null || (val >= 1 && val <= 500);
			},
			"Level must be between 1 and 500"
		),
	targetLevel: z.number()
		.refine(
			(val) => val === null || (val >= 1 && val <= 500),
			"Level must be between 1 and 500"
		),
	xpToNextLevel: z.number()
		.optional()
		.refine(
			(val) => {
				if (val === undefined) {
					return true;
				}
				return val >= 0 && val <= 1861867989;
			},
			"Xp must be between 0 and 1,861,867,989"
		),
}).refine(
	(data) => {
		const currentLevel = data.currentLevel;
		const targetLevel = data.targetLevel;

		return targetLevel > currentLevel;
	},
	{
		message: "Target Level must be greater than current XP"
	}
).refine(
	(data) => {
		const {currentLevel, xpToNextLevel: inputXpToNextLevel} = data;

		// Early neck
		if (inputXpToNextLevel === null || inputXpToNextLevel === undefined) {
			return true;
		}

		const currentLevelTotalXp = getXpForLevel(currentLevel);
		const nextLevelTotalXp = getXpForLevel(currentLevel + 1);
		const maxPossibleXpToNextLevel = nextLevelTotalXp - currentLevelTotalXp;

		return inputXpToNextLevel <= maxPossibleXpToNextLevel && inputXpToNextLevel >= 1;
	}
);

export type InputFormValues = z.infer<typeof formSchema>;

export function InputForm({onChange}: { onChange: (input: InputFormValues) => void }) {
	const form = useForm<InputFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			profession: Profession.Stonemason,
			passive: false,
			currentLevel: 1,
			targetLevel: 10,
			xpToNextLevel: undefined,
		},
	});

	/*useEffect(() => {
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
					form.resetField("targetLevel", {defaultValue: newLevel});
					form.resetField("targetXP", {defaultValue: getXpForLevel(newLevel)});
				}
			}

			// Update current XP/level pair
			if ((currentLevel !== null && currentXP == null) || form.getFieldState("currentLevel").isDirty) {
				form.resetField("currentXP", {defaultValue: getXpForLevel(currentLevel!)});
				form.resetField("currentLevel", {defaultValue: currentLevel});
			} else if ((currentXP !== null && currentLevel == null) || form.getFieldState("currentXP").isDirty) {
				form.resetField("currentLevel", {defaultValue: getLevelForXp(currentXP!)});
				form.resetField("currentXP", {defaultValue: currentXP});
			}

			// Update target XP/level pair
			if ((targetLevel !== null && targetXP == null) || form.getFieldState("targetLevel").isDirty) {
				form.resetField("targetXP", {defaultValue: getXpForLevel(targetLevel!)});
				form.resetField("targetLevel", {defaultValue: targetLevel});
			} else if ((targetXP !== null && targetLevel == null) || form.getFieldState("targetXP").isDirty) {
				form.resetField("targetLevel", {defaultValue: getLevelForXp(targetXP!)});
				form.resetField("targetXP", {defaultValue: targetXP});
			}


			// Only trigger parent onChange if we have all required values
			if (values.profession !== undefined) {
				onChange(values);
			}
			void form.trigger();
		};

		updateFormValues();
	}, [currentLevel, currentXP, targetLevel, targetXP, profession, passive, form]);*/

	useEffect(() => {
		// Only trigger parent onChange if we have all required values
		const values = form.getValues();
		if (values.profession !== undefined) {
			onChange(values);
		}
		void form.trigger();
	}, [form,]);

	return (
		<Form {...form}>
			<form className="space-y-6">
				<div className="flex gap-4 items-end">
					{/* Profession Selection */}
					<FormField
						control={form.control}
						name="profession"
						render={({field}) => (
							<FormItem className="grow">
								<FormLabel>Profession</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a profession"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{[Profession.Alchemist, Profession.Blacksmith, Profession.Stonemason, Profession.Bonewright, Profession.Leatherworker].map((prof) => (
											<SelectItem key={prof} value={prof}>
												{prof}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="passive"
						render={({field}) => (
							<FormItem>
								<FormLabel>Passive</FormLabel>
								<FormControl>
									<FormSwitch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>


				{/* Level and XP Inputs */}
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="currentLevel"
							render={({field}) => (
								<FormItem>
									<FormLabel>Current Level</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={field.value ?? 0}
											onChange={e => {
												// void form.trigger()
												return field.onChange(Number(e.target.value) || 0);
											}}
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="targetLevel"
							render={({field}) => (
								<FormItem>
									<FormLabel>Target Level</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={field.value ?? ""}
											onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="xpToNextLevel"
							render={({field}) => (
								<FormItem>
									<FormLabel>XP remaining</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={field.value ?? ""}
											onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
				</div>
			</form>
		</Form>

	);
}