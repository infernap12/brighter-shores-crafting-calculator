import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import App from "@/App.tsx";
import {WeaponCard} from "@/components/WeaponCard.tsx";
import {Weapon} from "@/domain/models/weapon.ts";
import {Recipe} from "@/domain/models/recipe.ts";
import {Faction, Profession} from "@/profession.ts";

const imageUrl = "src/assets/react.svg"
const recipe = new Recipe("DemoRecipe", 1,
	[{materialName: "DemoMaterial", quantity: 100}],
	"DemoFacility", Profession.Builder, 1, 100, false);

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/App">
				<App/>
			</ComponentPreview>
			<ComponentPreview path="/WeaponCard">
				<WeaponCard weapon={new Weapon(imageUrl, "DemoCard", recipe, 100, Faction.Cryoknight, "This is a description", "Super")}/>
			</ComponentPreview>
			<ComponentPreview path="/ComponentPreviews">
				<ComponentPreviews/>
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;