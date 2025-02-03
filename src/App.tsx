import './App.css'
import {dataService, ProcessedData} from "@/services/dataService.ts";
import {useQuery} from "@tanstack/react-query";
import {WeaponCard} from "@/components/WeaponCard.tsx";
import {Weapon} from "@/domain/models/weapon.ts";
import {resolveTotalXp} from "@/domain/services/calculatorService.ts";
import {Card, CardHeader} from "@/components/ui/card.tsx";
import {Table, TableHeader} from "@/components/ui/table.tsx";

function InputForm() {
	return (
		<Card>
			<CardHeader>
				<h1>Input Form</h1>
			</CardHeader>
		</Card>
	);
}

function DataTable() {
	return (
		<Table>
			<TableHeader>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Rarity</th>
					<th>XP</th>
				</tr>
			</TableHeader>
		</Table>
	);
}

function App() {
	return (
		<>
			<div>
				<InputForm/>
				<DataComponent/>
			</div>
			<DataTable/>
		</>

)
}

export default App

function DisplayData({data}: { data: ProcessedData }) {

	return (
		<>
			{Array.from(data.weapons.values()).map((weapon: Weapon) => (
				<WeaponCard key={weapon.fullName} weapon={weapon} totalXp={resolveTotalXp(weapon, data.materials)}/>
			))}
		</>
	);
}

function DataComponent() {
	const {isPending, error, data, isFetching} = useProcessedData()

	if (isPending) return 'Loading...'
	if (isFetching) return 'Fetching...'
	if (error) return 'An error has occurred: ' + error.message

	return <DisplayData data={data}/>
}

const useProcessedData = () => {
	return useQuery({
		queryKey: ['processedData'],
		queryFn: async () => await dataService.getProcessedData()
	})
}



