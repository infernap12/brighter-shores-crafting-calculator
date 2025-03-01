/*
 // src/debug.test.ts
 import {describe, expect, it} from 'vitest'
 import {ActivityDto, RecipeDto} from "@/services/api/types/dto.ts";

 import {Profession} from "@/profession.ts";

 // Mats with bad data
 function validateActivity(activity: ActivityDto, itemName: string) {
 console.log(activity);
 expect.soft(activity.output, `${itemName}: Output`).toHaveLength(1);
 if (!activity.output.map((item) => item.name).includes(itemName)) {
 console.log("Output does not include item - bypassing validation")
 return
 }
 expect.soft(activity.xp, `${itemName}: XP defined`).toBeDefined();
 if (activity.xp) {
 expect.soft(activity.xp, `${itemName}: XP value`).toBeGreaterThan(0);

 }
 expect.soft(activity.coop, `${itemName}: Coop`).toBeDefined();

 expect.soft(activity.profession, `${itemName}: Profession`).toBeOneOf(Object.values(Profession));
 expect.soft(activity.level, `${itemName}: Level`).toBeDefined();
 expect.soft(activity.passive, `${itemName}: Passive`).toBeDefined();

 if (!activity.passive) {
 expect.soft(activity.kp, `${itemName}: KP value`).toBeGreaterThan(0);
 expect.soft(activity.respawn, `${itemName}: Respawn`).toBeDefined();
 } else {
 expect.soft(activity.materials.length, `${itemName}: Materials`).toBeGreaterThan(0);
 }

 expect.soft(activity.duration, `${itemName}: Duration`).toBeDefined();
 }

 function validateRecipe(recipe: RecipeDto, itemName: string) {
 console.log(recipe);
 expect.soft(recipe.xp, `${itemName}: XP defined`).toBeDefined()
 expect.soft(recipe.xp, `${itemName}: XP value`).toBeGreaterThan(0);
 expect.soft(recipe.output, `${itemName}: Output`).toHaveLength(1);
 expect.soft(recipe.materials.length, `${itemName}: Materials`).toBeGreaterThan(0);
 expect.soft(recipe.facility, `${itemName}: Facility`).toBeDefined();
 expect.soft(recipe.profession, `${itemName}: Profession`).toBeOneOf(Object.values(Profession));
 expect.soft(recipe.level, `${itemName}: Level`).toBeDefined();
 expect.soft(recipe.passive, `${itemName}: Passive`).toBeDefined();

 if (!recipe.passive) {
 expect.soft(recipe.kp, `${itemName}: KP value`).toBeGreaterThan(0);
 }

 expect.soft(recipe.duration, `${itemName}: Duration`).toBeDefined();
 }


 describe('Wiki API Debug', async () => {
 const profs = [
 Profession.Blacksmith,
 Profession.Stonemason,
 Profession.Bonewright,
 Profession.Miner,
 Profession.Gatherer,
 Profession.Woodcutter,
 Profession.Carpenter,
 ]
 const response = await wikiApi.fetchItemsForProfessions(profs)
 it('should fetch items for profession list', () => {


 console.log("Printing response")
 console.log([...response]) // Pretty print the JSON
 console.log("finished printing response")

 expect(response).toBeInstanceOf(Map);
 expect(response.size).toBeGreaterThan(0)
 })
 describe('Data Quality', () => {
 for (const [name, item] of response.entries()) {
 if (name.includes("Explosives")) {
 continue;
 }
 it(`${name}: ${name || 'Unnamed'}`, () => {
 const isRecipe = item.printouts["Recipe JSON"]![0] !== undefined;
 console.log(isRecipe)
 const isActivity = item.printouts["Activity JSON"]![0] !== undefined;
 console.log(isActivity)

 expect(isActivity).not.toBe(isRecipe);
 if (isRecipe) {
 for (const jsonStr of item.printouts["Recipe JSON"]!) {
 const recipe = JSON.parse(jsonStr) as RecipeDto
 expect(recipe).toBeDefined();
 validateRecipe(recipe, name);
 }
 } else if (isActivity) {
 for (const jsonStr of item.printouts["Activity JSON"]!) {
 const activity = JSON.parse(jsonStr) as ActivityDto
 expect(activity).toBeDefined()
 validateActivity(activity, name)
 }
 } else {
 throw new Error("Item has neither a recipe nor an activity, how did it pass assertions?")
 }
 })
 }
 })
 })*/
