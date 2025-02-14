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


/**
 * Parameters for constructing an ask smw query for fetching data.
 *
 * @interface SMWQueryConfig
 * @property {string} [name] - The name of the wiki page to filter results by
 * @property {Array<string>} [categoriesOR] - Categories where at least one is required (OR condition)
 * @property {Array<string>} [categoriesAND] - Categories where all are required (AND condition)
 * @property {Array<Profession>} [professionA] - Professions where at least one is required (OR condition)
 * @property {Array<Printrequests>} printRequests - Properties to return in the result for each matched page
 * @property {askParams} askParams - Additional query parameters (limit, offset, sorting, etc.)
 */
interface SMWQueryConfig {
	name?: string;
	passive?: boolean;
	categoriesOR?: string[];
	categoriesAND?: string[];
	professionA?: Profession[];
	printRequests: Printrequests[];
	askParams: askParams;
}



export class WikiApi{
	static buildQuery(params: SMWQueryConfig): string {
		const categoryORConditions = params.categoriesOR?.length
			? `[[Category:${params.categoriesOR.join("||")}]]`
			: "";

		const categoryANDConditions = params.categoriesAND?.length
			? params.categoriesAND.map(category => `[[Category:${category}]]`).join(" ")
			: "";

		const professionConditions = params.professionA?.length
			? `[[Profession A::${params.professionA.join("||")}]]`
			: "";

		const nameCondition = params.name ? `[[${params.name}]]` : "";

		const passiveCondition = params.passive !== undefined
			? `[[Passive::${params.passive}]]`
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

		return `${nameCondition}${passiveCondition}${categoryORConditions}${categoryANDConditions}${professionConditions} ${printRequests}${askParams}`;
	}

	static async fetchWikiPage(params: SMWQueryConfig): Promise<Ask> {
		const query = this.buildQuery(params);
		const response = await fetch(apiUrl + urlParams(query).toString());
		return Convert.toAsk(await response.text());
	}


	static async fetchAllPages(params: SMWQueryConfig): Promise<Map<string, Result>> {
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

}
