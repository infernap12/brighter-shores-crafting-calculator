import {Profession} from "@/profession.ts";

import {Ask, Convert} from "@/services/api/askApi.ts";


const apiUrl = "https://brightershoreswiki.org/api.php?"

// const userAgent = 'Brighter Shores Weapon calc - test ([[User:Infernap12]])';

const params = (query: string) => {
	return new URLSearchParams({action: 'ask', query: query, format: 'json'})
};

export class wikiApi {

	static async fetchWeapons() {
		// todo adjust limit
		const query = "[[Category:Weapons]][[Recipe JSON::+]] |?Category |?Recipe_JSON |?Image |?Description |?Name |?Variant name |?Profession Level A |?Profession Level A High |?Profession A |limit=1 |sort=Profession Level A"
		const response = await fetch(apiUrl + params(query).toString())
		const askResponse: Ask = Convert.toAsk(await response.text())
		console.log(askResponse)
		return new Map(Object.entries(askResponse.query.results))

	}

	static async fetchItemsForProfessions(professions: Profession[]) {
		// todo adjust limit

		const query = `[[Profession A::${professions.join("||")}]] |?Category |?Recipe_JSON |?Name |?Description |?Variant name |?Image |?Profession Level A |?Profession Level A High |?-Dropped item.Dropped from.Activity JSON |limit=500 |sort=Profession Level A`

		const askResponse: Ask = Convert.toAsk(await fetch(apiUrl + params(query).toString()).then(r => r.text()))
		console.log(askResponse)
		return new Map(Object.entries(askResponse.query.results))
	}
}