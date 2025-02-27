import {useForm} from "react-hook-form";
import {Profession, ProfessionSetting} from "@/profession";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";

interface AssociatedProfessionsFormProps {
	associatedProfessions: Profession[];
	onChange: (settings: Map<Profession, ProfessionSetting>) => void;
	initialSettings: Map<Profession, ProfessionSetting>;
}


export function AssociatedProfessionsForm(
	{
		associatedProfessions,
		onChange,
		initialSettings
	}: AssociatedProfessionsFormProps
) {
	const defaultSettings = new Map<Profession, ProfessionSetting>();


	initialSettings.forEach((setting, profession) => {
		defaultSettings.set(profession, setting);
	});
	
	associatedProfessions.forEach(profession => {
		const existingSetting = defaultSettings.get(profession);
		defaultSettings.set(profession, existingSetting || {enabled: false, level: 1});
	})

	const form = useForm({
		defaultValues: {
			settings: Object.fromEntries(defaultSettings) as Record<Profession, ProfessionSetting>
		}
	});

	const handleChange = () => {
		const formValues = form.getValues().settings;
		// Convert back to Map when sending to parent
		const settingsMap = new Map<Profession, ProfessionSetting>();


		initialSettings.forEach((setting, profession) => {
			settingsMap.set(profession, setting);
		})

		Object.entries(formValues).forEach(([profession, setting]) => {
			settingsMap.set(
				profession as Profession,
				setting
			);
		})

		onChange(settingsMap);
	};

	return (
		<Form {...form}>
			<form className="space-y-4 mt-4">
				<div className="grid gap-4">
					{/* Add column headers */}
					<div className="grid grid-cols-2 gap-4 items-center">
						<div>Enable</div>
						<div>Level</div>
					</div>

					{associatedProfessions.map((profession) => (
						<div key={profession} className="grid grid-cols-2 gap-4 items-center">
							<FormField
								control={form.control}
								name={`settings.${profession}.enabled`}
								render={({field}) => (
									<FormItem className="flex flex-row items-center space-x-3 space-y-0">
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={(checked) => {
													field.onChange(checked);
													handleChange();
												}}
											/>
										</FormControl>
										<FormLabel className="font-normal">
											{profession}
										</FormLabel>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`settings.${profession}.level`}
								render={({field}) => (
									<FormItem>

										<FormControl>
											<Input
												type="number"
												min={1}
												max={500}
												{...field}
												onChange={e => {
													field.onChange(Number(e.target.value));
													handleChange();
												}}
												disabled={!form.watch(`settings.${profession}.enabled`)}
												className="w-24"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					))}
				</div>
			</form>
		</Form>
	);
}