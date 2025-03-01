// To parse this data:
//
//   import { Convert, Ask } from "./file";
//
//   const ask = Convert.toAsk(json);
// noinspection IncorrectFormatting

export interface Ask {
	"query-continue-offset"?: number;
	query: Query;
}

export interface Query {
	printrequests: Printrequest[];
	results:       { [key: string]: Result };
	serializer:    string;
	version:       number;
	meta:          Meta;
}

export interface Meta {
	hash?:   string;
	count?:  number;
	offset?: number;
	source?: string;
	time?:   string;
}

export interface Printrequest {
	label?:  string;
	key?:    string;
	redi?:   string;
	typeid?: Typeid;
	mode?:   number;
	format?: string;
	chain?:  string;
}

export enum Typeid {
	Boolean = "_boo",
	Date = "_dat",
	Keyword = "_keyw",
	Number = "_num",
	Text = "_txt",
	Page = "_wpg",
}


/**
 * Parameters for querying data.
 *
 * @property {number} [limit] - The maximum number of results to return.
 * @property {number} [offset] - The offset to start returning data from, used for pagination.
 *							   For example, if there are 100 total items, a limit of 50 with an offset of 50
 *							   will return items 51-100.
 * @property {string} [mainlabel] - Controls the printing of default printouts like the page name, URL, etc.
 *								  Setting this to "-" (a minus symbol) will remove the default printouts.
 * @property {Printrequests[]} [sort] - A list of properties to sort the results by.
 * @property {("asc" | "desc")[]} [order] - An optional list specifying the sorting order for each property.
 */
export interface askParams {
	limit?: number,
	offset?: number,
	mainlabel?: string,
	sort?: Printrequests[],
	order?: ("asc" | "desc")[]
}

export interface Result extends WikiPage{
	printouts: Printouts;
}

export interface WikiPage {
	fulltext:     string;
	fullurl:      string;
	namespace:    number;
	exists:       string;
	displaytitle: string;
}

export type Printrequests =
	keyof Printouts
	| "-Dropped item.Dropped from.Activity JSON=Activity JSON"
	| "-Sold item.Shop buy price=Shop buy price"
	| "-Sold item.Shop sell price=Shop sell price"
	| "Variant of.Action per hour banking=Action per hour banking";



export interface Printouts {
	"Activity JSON"?:            string[];
	"Action per hour banking"?:  number[];
	"Action per hour discarding"?:number[];
	"Activity KP"?:              number[];
	"Activity XP"?:              number[];
	"Activity album XP"?:        number[];
	"Activity coins"?:           number[];
	"Activity container"?:       WikiPage[];
	"Activity duration"?:        number[];
	"Activity input"?:           WikiPage[];
	"Activity level"?:           number[];
	"Additional Episode"?:       string[];
	Aggressive?:                 Bool[];
	"Album XP"?:                 number[];
	"Attack style"?:             string[];
	Bank?:                       WikiPage[];
	"Bounty JSON"?:              string[];
	"Bounty KP"?:                number[];
	"Bounty XP"?:                number[];
	"Bounty album XP"?:          number[];
	"Bounty coins"?:             number[];
	"Bounty destination"?:       WikiPage[];
	"Bounty name"?:              WikiPage[];
	"Bounty quantity"?:          number[];
	"Bounty start"?:             WikiPage[];
	Category?:                   WikiPage[];
	Clues?:                      number[];
	"Coins high"?:               number[];
	"Coins low"?:                number[];
	"Coins per hour"?:           number[];
	"Crime Den Enemy"?:          WikiPage[];
	Description?:                string[];
	Difficulty?:                 number[];
	"Drop JSON"?:                string[];
	"Dropped from"?:             WikiPage[];
	"Dropped item"?:             WikiPage[];
	"Dropped quantity"?:         string[];
	Duration?:                   string[];
	Enemies?:                    string[];
	Episode?:                    WikiPage[];
	"Episode nth"?:              number[];
	"Episode sequence number"?:  number[];
	Event?:                      WikiPage[];
	Experience?:                 number[];
	Health?:                     number[];
	Image?:                      WikiPage[];
	"Immune to"?:                string[];
	Infobox?:                    string[];
	Items?:                      string[];
	KP?:                         number[];
	Knowledge?:                  number[];
	"Located in"?:               WikiPage[];
	Location?:                   WikiPage[];
	"Location JSON"?:            string[];
	"Location inherited"?:       WikiPage[];
	"Location object"?:          WikiPage[];
	"Location quantity"?:        string[];
	Name?:                       string[];
	"Name color"?:               string[];
	"Name within variants"?:     string[];
	"Next quest"?:               WikiPage[];
	Passive?:                    Bool[];
	Premium?:                    Bool[];
	"Profession A"?:             WikiPage[];
	"Profession B"?:             WikiPage[];
	"Profession Level A"?:       number[];
	"Profession Level A High"?:  number[];
	"Profession Level B"?:       number[];
	"Profession Level B High"?:  number[];
	"Profession Requirement A"?: string[];
	"Profession Requirement B"?: string[];
	"Profession level"?:         number[];
	Quest?:                      WikiPage[];
	"Quest JSON"?:               string[];
	"Quest type"?:               string[];
	Rarity?:                     string[];
	RawMaterialTotalCost?:       string[];
	"Recipe JSON"?:              string[];
	"Recipe output"?:            WikiPage[];
	Recommended?:                string[];
	"Release Date"?:             WikiDate[];
	"Removal Date"?:             WikiDate[];
	"Required for"?:             WikiPage[];
	Requirements?:               string[];
	Shop?:                       WikiPage[];
	"Shop buy price"?:           string[];
	"Shop owner"?:               WikiPage[];
	"Shop sell price"?:          string[];
	"Skill node name"?:          string[];
	Slot?:                       string[];
	"Sold by"?:                  WikiPage[];
	"Sold item"?:                WikiPage[];
	"Start point"?:              string[];
	Suspects?:                   number[];
	"Unique stock"?:             WikiPage[];
	"Unlock level"?:             number[];
	"Unlock profession"?:        WikiPage[];
	Unlocks?:                    string[];
	"Update date"?:              WikiDate[];
	"Update name"?:              string[];
	"Update source"?:            string[];
	"Used in"?:                  WikiPage[];
	"Uses Quantity"?:            string[];
	"Uses facility"?:            string[];
	"Uses item"?:                WikiPage[];
	"Uses item and quantity"?:   string[];
	"Uses item quantity"?:       string[];
	"Uses profession"?:          WikiPage[];
	Value?:                      number[];
	Variant?:                    WikiPage[];
	"Variant name"?:             string[];
	"Variant of"?:               WikiPage[];
	"Variant type"?:             string[];
	"Version anchor"?:           string[];
	"Version default"?:          Bool[];
	"Vulnerable to"?:            string[];
	"Weapon strength"?:          number[];
	"XP boost"?:                 number[];
	"XP high"?:                  number[];
	"XP low"?:                   number[];
}

export enum Bool {
	false = "f",
	true = "t",
}

export interface WikiDate {
	timestamp?: string;
	raw?:       string;
}



// Converts JSON strings to/from your types
export class Convert {
	public static toAsk(json: string): Ask {
		return JSON.parse(json) as Ask;
	}

	public static askToJson(value: Ask): string {
		return JSON.stringify(value);
	}
}
