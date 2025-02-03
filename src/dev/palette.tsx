import {Fragment} from "react";
import {
	Category,
	Component,
	Variant,
	Palette,
} from "@react-buddy/ide-toolbox";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table.tsx";
import {
	Select, SelectContent,
	SelectGroup, SelectItem, SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton, SelectSeparator,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

export const PaletteTree = () => (
	<Palette>
		<Category name="App">
			<Component name="Loader">
				<Variant>
					<ExampleLoaderComponent/>
				</Variant>
			</Component>
		</Category>
		<Category name="Shadcn">
			<Component name="Table">
				<Variant>
					<Table/>
				</Variant>
			</Component>
			<Component name="TableHeader">
				<Variant>
					<TableHeader/>
				</Variant>
			</Component>
			<Component name="TableBody">
				<Variant>
					<TableBody/>
				</Variant>
			</Component>
			<Component name="TableFooter">
				<Variant>
					<TableFooter/>
				</Variant>
			</Component>
			<Component name="TableRow">
				<Variant>
					<TableRow/>
				</Variant>
			</Component>
			<Component name="TableHead">
				<Variant>
					<TableHead/>
				</Variant>
			</Component>
			<Component name="TableCell">
				<Variant>
					<TableCell/>
				</Variant>
			</Component>
			<Component name="TableCaption">
				<Variant>
					<TableCaption/>
				</Variant>
			</Component>
			<Component name="Select">
				<Variant>
					<Select/>
				</Variant>
			</Component>
			<Component name="SelectGroup">
				<Variant>
					<SelectGroup/>
				</Variant>
			</Component>
			<Component name="SelectValue">
				<Variant>
					<SelectValue/>
				</Variant>
			</Component>
			<Component name="SelectTrigger">
				<Variant>
					<SelectTrigger/>
				</Variant>
			</Component>
			<Component name="SelectScrollUpButton">
				<Variant>
					<SelectScrollUpButton/>
				</Variant>
			</Component>
			<Component name="SelectScrollDownButton">
				<Variant>
					<SelectScrollDownButton/>
				</Variant>
			</Component>
			<Component name="SelectContent">
				<Variant>
					<SelectContent/>
				</Variant>
			</Component>
			<Component name="SelectLabel">
				<Variant>
					<SelectLabel/>
				</Variant>
			</Component>
			<Component name="SelectItem">
				<Variant>
					<SelectItem value={""}/>
				</Variant>
			</Component>
			<Component name="SelectSeparator">
				<Variant>
					<SelectSeparator/>
				</Variant>
			</Component>
			<Component name="Card">
				<Variant>
					<Card/>
				</Variant>
			</Component>
			<Component name="CardHeader">
				<Variant>
					<CardHeader/>
				</Variant>
			</Component>
			<Component name="CardTitle">
				<Variant>
					<CardTitle/>
				</Variant>
			</Component>
			<Component name="CardDescription">
				<Variant>
					<CardDescription/>
				</Variant>
			</Component>
			<Component name="CardContent">
				<Variant>
					<CardContent/>
				</Variant>
			</Component>
			<Component name="CardFooter">
				<Variant>
					<CardFooter/>
				</Variant>
			</Component>
			<Component name="Input">
				<Variant>
					<Input/>
				</Variant>
			</Component>
			<Component name="Avatar">
				<Variant>
					<Avatar/>
				</Variant>
			</Component>
			<Component name="AvatarImage">
				<Variant>
					<AvatarImage/>
				</Variant>
			</Component>
			<Component name="AvatarFallback">
				<Variant>
					<AvatarFallback/>
				</Variant>
			</Component>
		</Category>
	</Palette>
);

export function ExampleLoaderComponent() {
	return (
		<Fragment>Loading...</Fragment>
	);
}