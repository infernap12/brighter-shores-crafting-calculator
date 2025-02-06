import {Profession} from "@/profession.ts";

import {Ask, askParams, Convert, Printrequests, Result} from "@/services/api/askApi.ts";


const apiUrl = "https://brightershoreswiki.org/api.php?"
// const userAgent = 'Brighter Shores Weapon calc v0.1-dev (github.com/infernap12/brighter-shores-weapon-calculator); ([[User:Infernap12]])';

// const fetchConfig = {
// 	headers: {
// 		'User-Agent': userAgent
// 	}
// };

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const urlParams = (query: string, maxlag: number = 5) => {
	return new URLSearchParams({action: 'ask', query: query, format: 'json', maxlag: maxlag.toString()})
};

interface WikiQueryParams {
	categoriesOR?: string[];
	categoriesAND?: string[];
	professionA?: Profession[];
	printRequests: Printrequests[];
	askParams: askParams;
}


export class WikiApi{
	static buildQuery(params: WikiQueryParams): string {
		const categoryORConditions = params.categoriesOR?.length
			? `[[Category:${params.categoriesOR.join("||")}]]`
			: "";

		const categoryANDConditions = params.categoriesAND?.length
			? params.categoriesAND.map(cat => `[[Category:${cat}]]`).join(" ")
			: "";

		const professionConditions = params.professionA?.length
			? `[[Profession A::${params.professionA.join("||")}]]`
			: "";

		const printRequests = params.printRequests
			.map(pr => `|?${pr}`)
			.join(" ");

		// Just construct the string directly
		const askParams = [
			` |limit=${params.askParams?.limit ?? 50}`,
			` |offset=${params.askParams?.offset ?? 0}`,
			params.askParams?.mainlabel ? ` |?mainlabel=${params.askParams.mainlabel}` : "",
			params.askParams?.sort?.length ? ` |?sort=${params.askParams.sort.join(",")}` : "",
			params.askParams?.order?.length ? ` |?order=${params.askParams.order.join(",")}` : ""
		].join("");

		return `${categoryORConditions}${categoryANDConditions}${professionConditions} ${printRequests}${askParams}`;
	}

	static async fetchWikiPage(params: WikiQueryParams): Promise<Ask> {
		const query = this.buildQuery(params);
		const response = await fetch(apiUrl + urlParams(query).toString());
		return Convert.toAsk(await response.text());
	}


	static async fetchAllPages(params: WikiQueryParams): Promise<Map<string, Result>> {
		const allResults = new Map<string, Result>();


		while (true) {
			console.log("Fetching set of pages", params.askParams.offset ?? 0);
			const askResponse = await this.fetchWikiPage(params);

			for (const [key, value] of Object.entries(askResponse.query.results)) {
				allResults.set(key, value);
			}

			if (!askResponse["query-continue-offset"]) break;
			params.askParams.offset = askResponse["query-continue-offset"];
			// await delay(1000)
		}
		return allResults;
	}

	// export function useWikiWeapons(professions: WeaponProfession[], limit: number = 50, offset: number = 0) {
	// 	return useQuery({
	// 		queryKey: ['wiki', 'weapons', professions, limit, offset],
	// 		queryFn: async () => {
	// 			const query = `[[Category:Weapons]][[Category:${professions.join("||")}]] |?Category |?Recipe_JSON |?Image |?Description |?Name |?Variant name |?Profession Level A |?Profession Level A High |?Profession A |limit=${limit} |offset${offset} |sort=Profession Level A`
	// 			const response = await fetch(apiUrl + urlParams(query).toString(), fetchConfig)
	// 			const askResponse: Ask = Convert.toAsk(await response.text())
	// 			console.log(askResponse)
	// 			return new Map(Object.entries(askResponse.query.results))
	// 		},
	// 	})
	// }

	// export function useWikiMaterials(professions: Profession[], limit: number = 500, offset: number = 0) {
	// 	return useQuery({
	// 		queryKey: ['wiki', 'materials', professions, limit, offset],
	// 		queryFn: async () => {
	// 			const query = `[[Category:Items]][[Profession A::${professions.join("||")}]] |?Category |?Recipe_JSON |?Name |?Description |?Variant name |?Image |?Profession Level A |?Profession Level A High |?-Dropped item.Dropped from.Activity JSON limit=${limit} |offset${offset} |sort=Profession Level A`
	// 			const response = await fetch(apiUrl + urlParams(query).toString(), fetchConfig)
	// 			const askResponse: Ask = Convert.toAsk(await response.text())
	// 			console.log(askResponse)
	// 			return new Map(Object.entries(askResponse.query.results))
	// 		},
	// 	})
	// }
}
