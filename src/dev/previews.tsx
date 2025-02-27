import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import App from "@/App.tsx";
/*import {WeaponCard} from "@/components/WeaponCard.tsx";
 import {Weapon} from "@/domain/models/weapon.ts";
 import {Recipe} from "@/domain/models/recipe.ts";
 import {Faction, Profession} from "@/profession.ts";*/
import {DataTableSkeleton, InputFormSkeleton, ItemCardSkeleton} from "@/components/skeleton-loaders.tsx";
import {Time} from "@/components/time.tsx";

/*const imageUrl = "src/assets/react.svg"
 const recipe = new Recipe("DemoRecipe", 1,
 [{materialName: "DemoMaterial", quantity: 100}],
 "DemoFacility", Profession.Builder, 1, 100, false);*/

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/App">
				<App/>
			</ComponentPreview>
			{/*<ComponentPreview path="/WeaponCard">
			 <WeaponCard
			 weapon={new Weapon(imageUrl, "DemoCard", recipe, 100, Faction.Cryoknight, "This is a description", "Super", "Demo")}
			 totalXp={12}/>
			 </ComponentPreview>*/}
			<ComponentPreview path="/ComponentPreviews">
				<ComponentPreviews/>
			</ComponentPreview>
			<ComponentPreview path="/WeaponCardSkeleton">
				<ItemCardSkeleton/>
			</ComponentPreview>
			<ComponentPreview path="/InputFormSkeleton">
				<InputFormSkeleton/>
			</ComponentPreview>
			<ComponentPreview path="/DataTableSkeleton">
				<DataTableSkeleton/>
			</ComponentPreview>
			<ComponentPreview path="/Time">
				<Time seconds={86999}/>
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;