import {get, set} from "idb-keyval";
import {useEffect, useState} from "react";
import {Profession, ProfessionSetting} from "@/profession.ts";

type SerializedProfessionSettings = Array<[Profession, ProfessionSetting]>;


export function useProfessionSettings() {
	const [professionSettings, setProfessionSettings] = useState<Map<Profession, ProfessionSetting>>(new Map());

	// Load settings when component mounts
	useEffect(() => {
		let mounted = true;

		const loadSettings = async () => {
			try {
				const savedSettings = await get<SerializedProfessionSettings>('professionSettings');
				if (mounted && savedSettings) {
					setProfessionSettings(new Map(savedSettings));
				}
			} catch (error) {
				console.error('Failed to load profession settings:', error);
				// Optionally handle the error in UI if needed
			}
		};

		void loadSettings();

		return () => {
			mounted = false;
		};
	}, []);

	// Wrapper function to update settings and persist them
	const updateProfessionSettings = async (newSettings: Map<Profession, ProfessionSetting>) => {
		try {
			await set('professionSettings', Array.from(newSettings.entries()) as SerializedProfessionSettings);
			setProfessionSettings(newSettings);
		} catch (error) {
			console.error('Failed to save profession settings:', error);
			// Optionally handle the error in UI if needed
			throw error; // Re-throw if you want calling code to handle the error
		}
	};

	return [professionSettings, updateProfessionSettings] as const;
}
