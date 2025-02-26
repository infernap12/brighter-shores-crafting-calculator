/* eslint-disable @typescript-eslint/no-empty-object-type */
// noinspection JSUnusedGlobalSymbols


import {ApiParams} from "types-mediawiki/api_params";


type timestamp = string;
type expiry = string;
type namespace = number;
type limit = number | "max";
type password = string;
type upload = File; // XXX
type OneOrMore<T> = T | T[];

export interface AbuseFilterApiCheckMatchParams extends ApiParams {
	filter?: string;
	vars?: string;
	rcid?: number;
	logid?: number;
}

export interface AbuseFilterApiCheckSyntaxParams extends ApiParams {
	filter?: string;
}

export interface AbuseFilterApiEvalExpressionParams extends ApiParams {
	expression?: string;
	prettyprint?: boolean;
}

export interface AbuseFilterApiUnblockAutopromoteParams extends ApiParams {
	user?: string;
	token?: string;
}

export interface AbuseFilterApiAbuseLogPrivateDetailsParams extends ApiParams {
	logid?: number;
	reason?: string;
	token?: string;
}

export interface ApiAcquireTempUserNameParams extends ApiParams {

}

export interface AntiSpoofApiAntiSpoofParams extends ApiParams {
	username?: string;
}

export interface SMWMediaWikiApiAskParams extends ApiParams {
	query?: string;
	api_version?: "2" | "3";
}

export interface SMWMediaWikiApiAskArgsParams extends ApiParams {
	conditions?: string | string[];
	printouts?: string | string[];
	parameters?: string | string[];
	api_version?: "2" | "3";
}

export interface ApiBlockParams extends ApiParams {
	user?: string;
	userid?: number;
	expiry?: string;
	reason?: string;
	anononly?: boolean;
	nocreate?: boolean;
	autoblock?: boolean;
	noemail?: boolean;
	hidename?: boolean;
	allowusertalk?: boolean;
	reblock?: boolean;
	watchuser?: boolean;
	tags?: string | string[];
	partial?: boolean;
	pagerestrictions?: string | string[];
	namespacerestrictions?: namespace | namespace[];
	token?: string;
}

export interface SMWMediaWikiApiBrowseByPropertyParams extends ApiParams {
	property?: string;
	limit?: string;
	lang?: string;
	listonly?: string;
}

export interface SMWMediaWikiApiBrowseBySubjectParams extends ApiParams {
	subject?: string;
	ns?: number;
	iw?: string;
	subobject?: string;
	type?: string;
	options?: string;
}

export interface CategoryTreeApiCategoryTreeParams extends ApiParams {
	category?: string;
	options?: string;
}

export interface ApiChangeAuthenticationDataParams extends ApiParams {
	changeauthrequest?: string;
	changeauthtoken?: string;
}

export interface ApiChangeContentModelParams extends ApiParams {
	title?: string;
	pageid?: number;
	summary?: string;
	tags?: string | string[];
	model?: "GadgetDefinition" | "GeoJSON" | "Scribunto" | "css" | "interactivemap" | "javascript" | "json" | "less" | "sanitized-css" | "smw/schema" | "text" | "wikitext";
	bot?: boolean;
	token?: string;
}

export interface ApiCheckTokenParams extends ApiParams {
	type?: "createaccount" | "csrf" | "login" | "patrol" | "rollback" | "userrights" | "watch";
	token?: string;
	maxtokenage?: number;
}

export interface CirrusSearchApiConfigDumpParams extends ApiParams {
	prop?: OneOrMore<"globals" | "namespacemap" | "profiles" | "replicagroup" | "usertesting">;
}

export interface CirrusSearchApiMappingDumpParams extends ApiParams {

}

export interface CirrusSearchApiProfilesDumpParams extends ApiParams {
	verbose?: boolean;
}

export interface CirrusSearchApiSettingsDumpParams extends ApiParams {

}

export interface ApiClearHasMsgParams extends ApiParams {

}

export interface ApiClientLoginParams extends ApiParams {
	loginrequests?: string | string[];
	loginmessageformat?: "html" | "none" | "raw" | "wikitext";
	loginmergerequestfields?: boolean;
	loginpreservestate?: boolean;
	loginreturnurl?: string;
	logincontinue?: boolean;
	logintoken?: string;
}

export interface ApiComparePagesParams extends ApiParams {
	fromtitle?: string;
	fromid?: number;
	fromrev?: number;
	fromslots?: OneOrMore<"main">;
	frompst?: boolean;
	fromtext?: string;
	fromcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	fromcontentmodel?: "GadgetDefinition" | "GeoJSON" | "Scribunto" | "css" | "interactivemap" | "javascript" | "json" | "less" | "sanitized-css" | "smw/schema" | "text" | "unknown" | "wikitext";
	fromsection?: string;
	totitle?: string;
	toid?: number;
	torev?: number;
	torelative?: "cur" | "next" | "prev";
	toslots?: OneOrMore<"main">;
	topst?: boolean;
	totext?: string;
	tocontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	tocontentmodel?: "GadgetDefinition" | "GeoJSON" | "Scribunto" | "css" | "interactivemap" | "javascript" | "json" | "less" | "sanitized-css" | "smw/schema" | "text" | "unknown" | "wikitext";
	tosection?: string;
	prop?: OneOrMore<"comment" | "diff" | "diffsize" | "ids" | "parsedcomment" | "rel" | "size" | "timestamp" | "title" | "user">;
	slots?: OneOrMore<"main">;
	difftype?: "inline" | "table" | "unified";
}

export interface ApiAMCreateAccountParams extends ApiParams {
	createrequests?: string | string[];
	createmessageformat?: "html" | "none" | "raw" | "wikitext";
	createmergerequestfields?: boolean;
	createpreservestate?: boolean;
	createreturnurl?: string;
	createcontinue?: boolean;
	createtoken?: string;
}

export interface ApiCSPReportParams extends ApiParams {
	reportonly?: boolean;
	source?: string;
}

export interface ApiDeleteParams extends ApiParams {
	title?: string;
	pageid?: number;
	reason?: string;
	tags?: string | string[];
	deletetalk?: boolean;
	watch?: boolean;
	watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
	unwatch?: boolean;
	oldimage?: string;
	token?: string;
}

export interface NotificationsApiEchoMarkReadParams extends ApiParams {
	wikis?: string | string[];
	list?: string | string[];
	unreadlist?: string | string[];
	all?: boolean;
	sections?: OneOrMore<"alert" | "message">;
	token?: string;
}

export interface NotificationsApiEchoMarkSeenParams extends ApiParams {
	type?: "alert" | "all" | "message";
	timestampFormat?: "ISO_8601" | "MW";
}

export interface NotificationsApiEchoMuteParams extends ApiParams {
	type?: "page-linked-title" | "user";
	mute?: string | string[];
	unmute?: string | string[];
	token?: string;
}

export interface ApiEditPageParams extends ApiParams {
	title?: string;
	pageid?: number;
	section?: string;
	sectiontitle?: string;
	text?: string;
	summary?: string;
	tags?: string | string[];
	minor?: boolean;
	notminor?: boolean;
	bot?: boolean;
	baserevid?: number;
	basetimestamp?: timestamp;
	starttimestamp?: timestamp;
	recreate?: boolean;
	createonly?: boolean;
	nocreate?: boolean;
	watch?: boolean;
	unwatch?: boolean;
	watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
	md5?: string;
	prependtext?: string;
	appendtext?: string;
	undo?: number;
	undoafter?: number;
	redirect?: boolean;
	contentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	contentmodel?: "GadgetDefinition" | "GeoJSON" | "Scribunto" | "css" | "interactivemap" | "javascript" | "json" | "less" | "sanitized-css" | "smw/schema" | "text" | "unknown" | "wikitext";
	returnto?: string;
	returntoquery?: string;
	returntoanchor?: string;
	token?: string;
}

export interface ApiEmailUserParams extends ApiParams {
	target?: string;
	subject?: string;
	text?: string;
	ccme?: boolean;
	token?: string;
}

export interface EmbedVideoApiEmbedVideoParams extends ApiParams {
	service?: string;
	id?: string;
	dimensions?: string;
	alignment?: string;
	description?: string;
	container?: string;
	urlargs?: string;
	autoresize?: string;
}

export interface ApiExpandTemplatesParams extends ApiParams {
	title?: string;
	text?: string;
	revid?: number;
	prop?: OneOrMore<"categories" | "encodedjsconfigvars" | "jsconfigvars" | "modules" | "parsetree" | "properties" | "ttl" | "volatile" | "wikitext">;
	includecomments?: boolean;
	showstrategykeys?: boolean;
	generatexml?: boolean;
	templatesandboxprefix?: string | string[];
	templatesandboxtitle?: string;
	templatesandboxtext?: string;
	templatesandboxcontentmodel?: "GadgetDefinition" | "GeoJSON" | "Scribunto" | "css" | "interactivemap" | "javascript" | "json" | "less" | "sanitized-css" | "smw/schema" | "text" | "unknown" | "wikitext";
	templatesandboxcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
}

export interface ApiFeedContributionsParams extends ApiParams {
	feedformat?: "atom" | "rss";
	user?: string;
	namespace?: namespace;
	year?: number;
	month?: number;
	tagfilter?: string | string[];
	deletedonly?: boolean;
	toponly?: boolean;
	newonly?: boolean;
	hideminor?: boolean;
	showsizediff?: boolean;
}

export interface ApiFeedRecentChangesParams extends ApiParams {
	feedformat?: "atom" | "rss";
	namespace?: namespace;
	invert?: boolean;
	associated?: boolean;
	days?: number;
	limit?: number;
	from?: timestamp;
	hideminor?: boolean;
	hidebots?: boolean;
	hideanons?: boolean;
	hideliu?: boolean;
	hidepatrolled?: boolean;
	hidemyself?: boolean;
	hidecategorization?: boolean;
	tagfilter?: string | string[];
	inverttags?: boolean;
	target?: string;
	showlinkedto?: boolean;
}

export interface ApiFeedWatchlistParams extends ApiParams {
	feedformat?: "atom" | "rss";
	hours?: number;
	linktosections?: boolean;
	allrev?: boolean;
	wlowner?: string;
	wltoken?: string;
	wlshow?: OneOrMore<"!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!unread" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "unread">;
	wltype?: OneOrMore<"categorize" | "edit" | "external" | "log" | "new">;
	wlexcludeuser?: string;
}

export interface ApiFileRevertParams extends ApiParams {
	filename?: string;
	comment?: string;
	archivename?: string;
	token?: string;
}

export interface GlobalBlockingApiGlobalBlockParams extends ApiParams {
	target?: string;
	expiry?: expiry;
	unblock?: boolean;
	reason?: string;
	anononly?: boolean;
	modify?: boolean;
	alsolocal?: boolean;
	localblockstalk?: boolean;
	localblocksemail?: boolean;
	localanononly?: boolean;
	token?: string;
}

export interface ApiHelpParams extends ApiParams {
	modules?: string | string[];
	submodules?: boolean;
	recursivesubmodules?: boolean;
	wrap?: boolean;
	toc?: boolean;
}

export interface ApiImageRotateParams extends ApiParams {
	rotation?: "90" | "180" | "270";
	continue?: string;
	tags?: string | string[];
	titles?: string | string[];
	pageids?: number | number[];
	revids?: number | number[];
	generator?: "allcategories" | "alldeletedrevisions" | "allfileusages" | "allimages" | "alllinks" | "allpages" | "allredirects" | "allrevisions" | "alltransclusions" | "backlinks" | "categories" | "categorymembers" | "deletedrevisions" | "duplicatefiles" | "embeddedin" | "exturlusage" | "fileusage" | "images" | "imageusage" | "iwbacklinks" | "langbacklinks" | "links" | "linkshere" | "pageswithprop" | "prefixsearch" | "protectedtitles" | "querypage" | "random" | "recentchanges" | "redirects" | "revisions" | "search" | "templates" | "transcludedin" | "watchlist" | "watchlistraw";
	redirects?: boolean;
	converttitles?: boolean;
	token?: string;
}

export interface ApiImportParams extends ApiParams {
	summary?: string;
	xml?: upload;
	interwikiprefix?: string;
	interwikisource?:
		| "commons"
		| "de"
		| "es"
		| "fr"
		| "it"
		| "meta"
		| "nost"
		| "outreachwiki"
		| "pl"
		| "test2wiki";
	interwikipage?: string;
	fullhistory?: boolean;
	templates?: boolean;
	namespace?: namespace;
	assignknownusers?: boolean;
	rootpage?: string;
	tags?: string | string[];
	token?: string;
}

export interface ApiFormatJsonParams extends ApiParams {
	callback?: string;
	utf8?: boolean;
	ascii?: boolean;
	formatversion?: "1" | "2" | "latest";
}

export interface ApiFormatJsonParams extends ApiParams {
	wrappedhtml?: boolean;
	callback?: string;
	utf8?: boolean;
	ascii?: boolean;
	formatversion?: "1" | "2" | "latest";
}

export interface ApiLinkAccountParams extends ApiParams {
	linkrequests?: string | string[];
	linkmessageformat?: "html" | "none" | "raw" | "wikitext";
	linkmergerequestfields?: boolean;
	linkreturnurl?: string;
	linkcontinue?: boolean;
	linktoken?: string;
}

export interface ApiLinkSuggestParams extends ApiParams {
	get?: "image" | "suggestions";
	query?: string;
}

export interface ApiLoginParams extends ApiParams {
	lgname?: string;
	lgpassword?: password;
	lgdomain?: string;
	lgtoken?: string;
}

export interface ApiLogoutParams extends ApiParams {
	token?: string;
}

export interface ApiManageTagsParams extends ApiParams {
	operation?: "activate" | "create" | "deactivate" | "delete";
	tag?: string;
	reason?: string;
	ignorewarnings?: boolean;
	tags?: string | string[];
	token?: string;
}

export interface ApiMergeHistoryParams extends ApiParams {
	from?: string;
	fromid?: number;
	to?: string;
	toid?: number;
	timestamp?: timestamp;
	reason?: string;
	token?: string;
}

export interface ApiMoveParams extends ApiParams {
	from?: string;
	fromid?: number;
	to?: string;
	reason?: string;
	movetalk?: boolean;
	movesubpages?: boolean;
	noredirect?: boolean;
	watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
	ignorewarnings?: boolean;
	tags?: string | string[];
	token?: string;
}

export interface ApiFormatNoneParams extends ApiParams {

}

export interface OATHAuthApiModuleApiOATHValidateParams extends ApiParams {
	user?: string;
	data?: string;
	token?: string;
}

export interface ApiOpenSearchParams extends ApiParams {
	search?: string;
	namespace?: namespace | namespace[];
	limit?: limit;
	suggest?: boolean;
	redirects?: "resolve" | "return";
	format?: "json" | "jsonfm" | "xml" | "xmlfm";
	warningsaserror?: boolean;
}

export interface ApiOptionsParams extends ApiParams {
	reset?: boolean;
	resetkinds?: OneOrMore<"all" | "registered" | "registered-checkmatrix" | "registered-multiselect" | "special" | "unused" | "userjs">;
	change?: string | string[];
	optionname?: string;
	optionvalue?: string;
	token?: string;
}

export interface ApiParamInfoParams extends ApiParams {
	modules?: string | string[];
	helpformat?: "html" | "none" | "raw" | "wikitext";
	querymodules?: OneOrMore<"abusefilters" | "abuselog" | "allcategories" | "alldeletedrevisions" | "allfileusages" | "allimages" | "alllinks" | "allmessages" | "allpages" | "allredirects" | "allrevisions" | "alltransclusions" | "allusers" | "authmanagerinfo" | "backlinks" | "blocks" | "categories" | "categoryinfo" | "categorymembers" | "checkuser" | "checkuserlog" | "cirrusbuilddoc" | "cirruscompsuggestbuilddoc" | "cirrusdoc" | "contributors" | "deletedrevisions" | "deletedrevs" | "duplicatefiles" | "embeddedin" | "extlinks" | "extracts" | "exturlusage" | "filearchive" | "filerepoinfo" | "fileusage" | "gadgetcategories" | "gadgets" | "globalblocks" | "imageinfo" | "images" | "imageusage" | "info" | "iwbacklinks" | "iwlinks" | "langbacklinks" | "langlinks" | "languageinfo" | "links" | "linkshere" | "logevents" | "mystashedfiles" | "notifications" | "oath" | "pageimages" | "pagepropnames" | "pageprops" | "pageswithprop" | "prefixsearch" | "protectedtitles" | "querypage" | "random" | "recentchanges" | "redirects" | "revisions" | "search" | "siteinfo" | "stashimageinfo" | "tags" | "templates" | "tokens" | "transcludedin" | "transcodestatus" | "unreadnotificationpages" | "usercontribs" | "userinfo" | "users" | "videoinfo" | "watchlist" | "watchlistraw">;
	mainmodule?: string;
	pagesetmodule?: string;
	formatmodules?: OneOrMore<"json" | "jsonfm" | "none" | "php" | "phpfm" | "rawfm" | "xml" | "xmlfm">;
}

export interface ApiParseParams extends ApiParams {
	title?: string;
	text?: string;
	revid?: number;
	summary?: string;
	page?: string;
	pageid?: number;
	redirects?: boolean;
	oldid?: number;
	prop?: OneOrMore<"categories" | "categorieshtml" | "displaytitle" | "encodedjsconfigvars" | "externallinks" | "headhtml" | "images" | "indicators" | "iwlinks" | "jsconfigvars" | "langlinks" | "limitreportdata" | "limitreporthtml" | "links" | "modules" | "parsetree" | "parsewarnings" | "parsewarningshtml" | "properties" | "revid" | "sections" | "subtitle" | "templates" | "text" | "wikitext" | "headitems">;
	wrapoutputclass?: string;
	parsoid?: boolean;
	pst?: boolean;
	onlypst?: boolean;
	effectivelanglinks?: boolean;
	section?: string;
	sectiontitle?: string;
	disablepp?: boolean;
	disablelimitreport?: boolean;
	disableeditsection?: boolean;
	disablestylededuplication?: boolean;
	showstrategykeys?: boolean;
	generatexml?: boolean;
	preview?: boolean;
	sectionpreview?: boolean;
	disabletoc?: boolean;
	useskin?: "apioutput" | "fallback" | "minerva" | "vector" | "vector-2022";
	contentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	contentmodel?: "GadgetDefinition" | "GeoJSON" | "Scribunto" | "css" | "interactivemap" | "javascript" | "json" | "less" | "sanitized-css" | "smw/schema" | "text" | "unknown" | "wikitext";
	mobileformat?: boolean;
	templatesandboxprefix?: string | string[];
	templatesandboxtitle?: string;
	templatesandboxtext?: string;
	templatesandboxcontentmodel?: "GadgetDefinition" | "GeoJSON" | "Scribunto" | "css" | "interactivemap" | "javascript" | "json" | "less" | "sanitized-css" | "smw/schema" | "text" | "unknown" | "wikitext";
	templatesandboxcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
}

export interface ApiPatrolParams extends ApiParams {
	rcid?: number;
	revid?: number;
	tags?: string | string[];
	token?: string;
}

export interface ApiFormatPhpParams extends ApiParams {
	formatversion?: "1" | "2" | "latest";
}

export interface ApiFormatPhpParams extends ApiParams {
	wrappedhtml?: boolean;
	formatversion?: "1" | "2" | "latest";
}

export interface ApiAJAXPollSubmitVoteParams extends ApiParams {
	poll?: string;
	answer?: number;
	token?: string;
}

export interface ApiProtectParams extends ApiParams {
	title?: string;
	pageid?: number;
	protections?: string | string[];
	expiry?: string | string[];
	reason?: string;
	tags?: string | string[];
	cascade?: boolean;
	watch?: boolean;
	watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
	token?: string;
}

export interface ApiPurgeParams extends ApiParams {
	forcelinkupdate?: boolean;
	forcerecursivelinkupdate?: boolean;
	continue?: string;
	titles?: string | string[];
	pageids?: number | number[];
	revids?: number | number[];
	generator?: "allcategories" | "alldeletedrevisions" | "allfileusages" | "allimages" | "alllinks" | "allpages" | "allredirects" | "allrevisions" | "alltransclusions" | "backlinks" | "categories" | "categorymembers" | "deletedrevisions" | "duplicatefiles" | "embeddedin" | "exturlusage" | "fileusage" | "images" | "imageusage" | "iwbacklinks" | "langbacklinks" | "links" | "linkshere" | "pageswithprop" | "prefixsearch" | "protectedtitles" | "querypage" | "random" | "recentchanges" | "redirects" | "revisions" | "search" | "templates" | "transcludedin" | "watchlist" | "watchlistraw";
	redirects?: boolean;
	converttitles?: boolean;
}

export interface ApiQueryParams extends ApiParams {
	prop?: OneOrMore<"categories" | "categoryinfo" | "cirrusbuilddoc" | "cirruscompsuggestbuilddoc" | "cirrusdoc" | "contributors" | "deletedrevisions" | "duplicatefiles" | "extlinks" | "extracts" | "fileusage" | "imageinfo" | "images" | "info" | "iwlinks" | "langlinks" | "links" | "linkshere" | "pageimages" | "pageprops" | "redirects" | "revisions" | "stashimageinfo" | "templates" | "transcludedin" | "transcodestatus" | "videoinfo">;
	list?: OneOrMore<"abusefilters" | "abuselog" | "allcategories" | "alldeletedrevisions" | "allfileusages" | "allimages" | "alllinks" | "allpages" | "allredirects" | "allrevisions" | "alltransclusions" | "allusers" | "backlinks" | "blocks" | "categorymembers" | "checkuser" | "checkuserlog" | "embeddedin" | "exturlusage" | "filearchive" | "gadgetcategories" | "gadgets" | "globalblocks" | "imageusage" | "iwbacklinks" | "langbacklinks" | "logevents" | "mystashedfiles" | "pagepropnames" | "pageswithprop" | "prefixsearch" | "protectedtitles" | "querypage" | "random" | "recentchanges" | "search" | "tags" | "usercontribs" | "users" | "watchlist" | "watchlistraw" | "deletedrevs">;
	meta?: OneOrMore<"allmessages" | "authmanagerinfo" | "filerepoinfo" | "languageinfo" | "notifications" | "siteinfo" | "tokens" | "unreadnotificationpages" | "userinfo" | "oath">;
	indexpageids?: boolean;
	export?: boolean;
	exportnowrap?: boolean;
	exportschema?: "0.10" | "0.11";
	iwurl?: boolean;
	continue?: string;
	rawcontinue?: boolean;
	titles?: string | string[];
	pageids?: number | number[];
	revids?: number | number[];
	generator?: "allcategories" | "alldeletedrevisions" | "allfileusages" | "allimages" | "alllinks" | "allpages" | "allredirects" | "allrevisions" | "alltransclusions" | "backlinks" | "categories" | "categorymembers" | "deletedrevisions" | "duplicatefiles" | "embeddedin" | "exturlusage" | "fileusage" | "images" | "imageusage" | "iwbacklinks" | "langbacklinks" | "links" | "linkshere" | "pageswithprop" | "prefixsearch" | "protectedtitles" | "querypage" | "random" | "recentchanges" | "redirects" | "revisions" | "search" | "templates" | "transcludedin" | "watchlist" | "watchlistraw";
	redirects?: boolean;
	converttitles?: boolean;
}

export interface ApiFormatJsonParams extends ApiParams {
	wrappedhtml?: boolean;
}

export interface ApiRemoveAuthenticationDataParams extends ApiParams {
	request?: string;
	token?: string;
}

export interface ApiResetPasswordParams extends ApiParams {
	user?: string;
	email?: string;
	token?: string;
}

export interface ApiRevisionDeleteParams extends ApiParams {
	type?: "archive" | "filearchive" | "logging" | "oldimage" | "revision";
	target?: string;
	ids?: string | string[];
	hide?: OneOrMore<"comment" | "content" | "user">;
	show?: OneOrMore<"comment" | "content" | "user">;
	suppress?: "no" | "nochange" | "yes";
	reason?: string;
	tags?: string | string[];
	token?: string;
}

export interface ApiRollbackParams extends ApiParams {
	title?: string;
	pageid?: number;
	tags?: string | string[];
	user?: string;
	summary?: string;
	markbot?: boolean;
	watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
	token?: string;
}

export interface ApiRsdParams extends ApiParams {

}

export interface ScribuntoApiScribuntoConsoleParams extends ApiParams {
	title?: string;
	content?: string;
	session?: number;
	question?: string;
	clear?: boolean;
	token?: string;
}

export interface ApiSetNotificationTimestampParams extends ApiParams {
	entirewatchlist?: boolean;
	timestamp?: timestamp;
	torevid?: number;
	newerthanrevid?: number;
	continue?: string;
	titles?: string | string[];
	pageids?: number | number[];
	revids?: number | number[];
	generator?: "allcategories" | "alldeletedrevisions" | "allfileusages" | "allimages" | "alllinks" | "allpages" | "allredirects" | "allrevisions" | "alltransclusions" | "backlinks" | "categories" | "categorymembers" | "deletedrevisions" | "duplicatefiles" | "embeddedin" | "exturlusage" | "fileusage" | "images" | "imageusage" | "iwbacklinks" | "langbacklinks" | "links" | "linkshere" | "pageswithprop" | "prefixsearch" | "protectedtitles" | "querypage" | "random" | "recentchanges" | "redirects" | "revisions" | "search" | "templates" | "transcludedin" | "watchlist" | "watchlistraw";
	redirects?: boolean;
	converttitles?: boolean;
	token?: string;
}

export interface ApiSetPageLanguageParams extends ApiParams {
	title?: string;
	pageid?: number;
	lang?: "de" | "default" | "en" | "en-gb" | "es" | "fr" | "it" | "ja" | "ko" | "lzh" | "nl" | "pl" | "pt" | "pt-br" | "ru" | "th" | "uk" | "zh" | "zh-cn" | "zh-hans" | "zh-hant" | "zh-hk" | "zh-tw";
	reason?: string;
	tags?: string | string[];
	token?: string;
}

export interface SMWMediaWikiApiBrowseParams extends ApiParams {
	browse?: "category" | "concept" | "page" | "property" | "psubject" | "pvalue" | "subject";
	params?: string;
}

export interface SMWMediaWikiApiInfoParams extends ApiParams {
	info?: OneOrMore<"conceptcount" | "declaredpropcount" | "deletecount" | "errorcount" | "formatcount" | "jobcount" | "propcount" | "proppagecount" | "querycount" | "querysize" | "subobjectcount" | "totalpropcount" | "usedpropcount">;
}

export interface SMWMediaWikiApiTaskParams extends ApiParams {
	task?: "check-query" | "duplicate-lookup" | "insert-job" | "run-entity-examiner" | "run-joblist" | "table-statistics" | "update";
	params?: string;
	token?: string;
}

export interface SpamBlacklistApiSpamBlacklistParams extends ApiParams {
	url?: string | string[];
}

export interface ApiStashEditParams extends ApiParams {
	title?: string;
	section?: string;
	sectiontitle?: string;
	text?: string;
	stashedtexthash?: string;
	summary?: string;
	contentmodel?: "GadgetDefinition" | "GeoJSON" | "Scribunto" | "css" | "interactivemap" | "javascript" | "json" | "less" | "sanitized-css" | "smw/schema" | "text" | "unknown" | "wikitext";
	contentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	baserevid?: number;
	token?: string;
}

export interface ApiTagParams extends ApiParams {
	rcid?: number | number[];
	revid?: number | number[];
	logid?: number | number[];
	add?: OneOrMore<>;
	remove?: string | string[];
	reason?: string;
	tags?: string | string[];
	token?: string;
}

export interface TemplateDataApiTemplateDataParams extends ApiParams {
	includeMissingTitles?: boolean;
	doNotIgnoreMissingTitles?: boolean;
	lang?: string;
	titles?: string | string[];
	pageids?: number | number[];
	revids?: number | number[];
	generator?: "allcategories" | "alldeletedrevisions" | "allfileusages" | "allimages" | "alllinks" | "allpages" | "allredirects" | "allrevisions" | "alltransclusions" | "backlinks" | "categories" | "categorymembers" | "deletedrevisions" | "duplicatefiles" | "embeddedin" | "exturlusage" | "fileusage" | "images" | "imageusage" | "iwbacklinks" | "langbacklinks" | "links" | "linkshere" | "pageswithprop" | "prefixsearch" | "protectedtitles" | "querypage" | "random" | "recentchanges" | "redirects" | "revisions" | "search" | "templates" | "transcludedin" | "watchlist" | "watchlistraw";
	redirects?: boolean;
	converttitles?: boolean;
}

export interface ThanksApiCoreThankParams extends ApiParams {
	rev?: number;
	log?: number;
	token?: string;
	source?: string;
}

export interface TitleBlacklistApiTitleBlacklistParams extends ApiParams {
	tbtitle?: string;
	tbaction?: "create" | "createpage" | "createtalk" | "edit" | "move" | "new-account" | "upload";
	tbnooverride?: boolean;
}

export interface MediaWikiTimedMediaHandlerApiTranscodeResetParams extends ApiParams {
	title?: string;
	transcodekey?: string;
	token?: string;
}

export interface ApiUnblockParams extends ApiParams {
	id?: number;
	user?: string;
	userid?: number;
	reason?: string;
	tags?: string | string[];
	watchuser?: boolean;
	token?: string;
}

export interface ApiUndeleteParams extends ApiParams {
	title?: string;
	reason?: string;
	tags?: string | string[];
	timestamps?: timestamp | timestamp[];
	fileids?: number | number[];
	undeletetalk?: boolean;
	watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
	token?: string;
}

export interface ApiRemoveAuthenticationDataParams extends ApiParams {
	request?: string;
	token?: string;
}

export interface ApiUploadParams extends ApiParams {
	filename?: string;
	comment?: string;
	tags?: string | string[];
	text?: string;
	watch?: boolean;
	watchlist?: "nochange" | "preferences" | "watch";
	ignorewarnings?: boolean;
	file?: upload;
	url?: string;
	filekey?: string;
	sessionkey?: string;
	stash?: boolean;
	filesize?: number;
	offset?: number;
	chunk?: upload;
	async?: boolean;
	checkstatus?: boolean;
	token?: string;
}

export interface ApiUserrightsParams extends ApiParams {
	user?: string;
	userid?: number;
	add?: OneOrMore<"bot" | "bureaucrat" | "checkuser" | "staff" | "sysop">;
	expiry?: string | string[];
	remove?: OneOrMore<"bot" | "bureaucrat" | "checkuser" | "staff" | "sysop">;
	reason?: string;
	token?: string;
	tags?: string | string[];
	watchuser?: boolean;
}

export interface ApiValidatePasswordParams extends ApiParams {
	password?: password;
	user?: string;
	email?: string;
	realname?: string;
}

export interface VisualEditorApiVisualEditorParams extends ApiParams {
	page?: string;
	badetag?: string;
	format?: "json" | "jsonfm";
	paction?: "metadata" | "parse" | "parsefragment" | "templatesused" | "wikitext";
	wikitext?: string;
	section?: string;
	stash?: boolean;
	oldid?: number;
	editintro?: string;
	pst?: boolean;
	preload?: string;
	preloadparams?: string | string[];
}

export interface VisualEditorApiVisualEditorEditParams extends ApiParams {
	paction?: "diff" | "save" | "serialize" | "serializeforcache";
	page?: string;
	token?: string;
	wikitext?: string;
	section?: string;
	sectiontitle?: string;
	basetimestamp?: timestamp;
	starttimestamp?: timestamp;
	oldid?: number;
	minor?: string;
	watchlist?: string;
	html?: string;
	etag?: string;
	summary?: string;
	captchaid?: string;
	captchaword?: string;
	cachekey?: string;
	nocontent?: boolean;
	returnto?: string;
	returntoquery?: string;
	returntoanchor?: string;
	useskin?: "apioutput" | "fallback" | "minerva" | "vector" | "vector-2022";
	tags?: string | string[];
	plugins?: string | string[];
	mobileformat?: boolean;
}

export interface ApiWatchParams extends ApiParams {
	title?: string;
	unwatch?: boolean;
	continue?: string;
	titles?: string | string[];
	pageids?: number | number[];
	revids?: number | number[];
	generator?: "allcategories" | "alldeletedrevisions" | "allfileusages" | "allimages" | "alllinks" | "allpages" | "allredirects" | "allrevisions" | "alltransclusions" | "backlinks" | "categories" | "categorymembers" | "deletedrevisions" | "duplicatefiles" | "embeddedin" | "exturlusage" | "fileusage" | "images" | "imageusage" | "iwbacklinks" | "langbacklinks" | "links" | "linkshere" | "pageswithprop" | "prefixsearch" | "protectedtitles" | "querypage" | "random" | "recentchanges" | "redirects" | "revisions" | "search" | "templates" | "transcludedin" | "watchlist" | "watchlistraw";
	redirects?: boolean;
	converttitles?: boolean;
	token?: string;
}

export interface MobileFrontendApiWebappManifestParams extends ApiParams {

}

export interface ApiFormatXmlParams extends ApiParams {
	xslt?: string;
	includexmlnamespace?: boolean;
}

export interface ApiFormatXmlParams extends ApiParams {
	wrappedhtml?: boolean;
	xslt?: string;
	includexmlnamespace?: boolean;
}

export interface AbuseFilterApiQueryAbuseFiltersParams extends ApiQueryParams {
	abfstartid?: number;
	abfendid?: number;
	abfdir?: "newer" | "older";
	abfshow?: OneOrMore<"!deleted" | "!enabled" | "!private" | "deleted" | "enabled" | "private">;
	abflimit?: limit;
	abfprop?: OneOrMore<"actions" | "comments" | "description" | "hits" | "id" | "lasteditor" | "lastedittime" | "pattern" | "private" | "status">;
}

export interface AbuseFilterApiQueryAbuseLogParams extends ApiQueryParams {
	afllogid?: number;
	aflstart?: timestamp;
	aflend?: timestamp;
	afldir?: "newer" | "older";
	afluser?: string;
	afltitle?: string;
	aflfilter?: string | string[];
	afllimit?: limit;
	aflprop?: OneOrMore<"action" | "details" | "filter" | "hidden" | "ids" | "result" | "revid" | "timestamp" | "title" | "user">;
}

export interface ApiQueryAllCategoriesParams extends ApiQueryParams {
	acfrom?: string;
	accontinue?: string;
	acto?: string;
	acprefix?: string;
	acdir?: "ascending" | "descending";
	acmin?: number;
	acmax?: number;
	aclimit?: limit;
	acprop?: OneOrMore<"hidden" | "size">;
}

export interface ApiQueryAllDeletedRevisionsParams extends ApiQueryParams {
	adrprop?: OneOrMore<"comment" | "content" | "contentmodel" | "flags" | "ids" | "parsedcomment" | "roles" | "sha1" | "size" | "slotsha1" | "slotsize" | "tags" | "timestamp" | "user" | "userid" | "parsetree">;
	adrslots?: OneOrMore<"main">;
	adrlimit?: limit;
	adrexpandtemplates?: boolean;
	adrgeneratexml?: boolean;
	adrparse?: boolean;
	adrsection?: string;
	adrdiffto?: string;
	adrdifftotext?: string;
	adrdifftotextpst?: boolean;
	adrcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	adruser?: string;
	adrnamespace?: namespace | namespace[];
	adrstart?: timestamp;
	adrend?: timestamp;
	adrdir?: "newer" | "older";
	adrfrom?: string;
	adrto?: string;
	adrprefix?: string;
	adrexcludeuser?: string;
	adrtag?: string;
	adrcontinue?: string;
	adrgeneratetitles?: boolean;
}

export interface ApiQueryAllLinksParams extends ApiQueryParams {
	afcontinue?: string;
	affrom?: string;
	afto?: string;
	afprefix?: string;
	afunique?: boolean;
	afprop?: OneOrMore<"ids" | "title">;
	aflimit?: limit;
	afdir?: "ascending" | "descending";
}

export interface ApiQueryAllImagesParams extends ApiQueryParams {
	aisort?: "name" | "timestamp";
	aidir?: "ascending" | "descending" | "newer" | "older";
	aifrom?: string;
	aito?: string;
	aicontinue?: string;
	aistart?: timestamp;
	aiend?: timestamp;
	aiprop?: OneOrMore<"badfile" | "bitdepth" | "canonicaltitle" | "comment" | "commonmetadata" | "dimensions" | "extmetadata" | "mediatype" | "metadata" | "mime" | "parsedcomment" | "sha1" | "size" | "timestamp" | "url" | "user" | "userid">;
	aiprefix?: string;
	aiminsize?: number;
	aimaxsize?: number;
	aisha1?: string;
	aisha1base36?: string;
	aiuser?: string;
	aifilterbots?: "all" | "bots" | "nobots";
	aimime?: string | string[];
	ailimit?: limit;
}

export interface ApiQueryAllLinksParams extends ApiQueryParams {
	alcontinue?: string;
	alfrom?: string;
	alto?: string;
	alprefix?: string;
	alunique?: boolean;
	alprop?: OneOrMore<"ids" | "title">;
	alnamespace?: namespace;
	allimit?: limit;
	aldir?: "ascending" | "descending";
}

export interface ApiQueryAllMessagesParams extends ApiQueryParams {
	ammessages?: string | string[];
	amprop?: OneOrMore<"default">;
	amenableparser?: boolean;
	amnocontent?: boolean;
	amincludelocal?: boolean;
	amargs?: string | string[];
	amfilter?: string;
	amcustomised?: "all" | "modified" | "unmodified";
	amlang?: string;
	amfrom?: string;
	amto?: string;
	amtitle?: string;
	amprefix?: string;
}

export interface ApiQueryAllPagesParams extends ApiQueryParams {
	apfrom?: string;
	apcontinue?: string;
	apto?: string;
	apprefix?: string;
	apnamespace?: namespace;
	apfilterredir?: "all" | "nonredirects" | "redirects";
	apfilterlanglinks?: "all" | "withlanglinks" | "withoutlanglinks";
	apminsize?: number;
	apmaxsize?: number;
	apprtype?: OneOrMore<"edit" | "move" | "upload">;
	apprlevel?: OneOrMore<"" | "autoconfirmed" | "sysop">;
	apprfiltercascade?: "all" | "cascading" | "noncascading";
	apprexpiry?: "all" | "definite" | "indefinite";
	aplimit?: limit;
	apdir?: "ascending" | "descending";
}

export interface ApiQueryAllLinksParams extends ApiQueryParams {
	arcontinue?: string;
	arfrom?: string;
	arto?: string;
	arprefix?: string;
	arunique?: boolean;
	arprop?: OneOrMore<"fragment" | "ids" | "interwiki" | "title">;
	arnamespace?: namespace;
	arlimit?: limit;
	ardir?: "ascending" | "descending";
}

export interface ApiQueryAllRevisionsParams extends ApiQueryParams {
	arvprop?: OneOrMore<"comment" | "content" | "contentmodel" | "flags" | "ids" | "parsedcomment" | "roles" | "sha1" | "size" | "slotsha1" | "slotsize" | "tags" | "timestamp" | "user" | "userid" | "parsetree">;
	arvslots?: OneOrMore<"main">;
	arvlimit?: limit;
	arvexpandtemplates?: boolean;
	arvgeneratexml?: boolean;
	arvparse?: boolean;
	arvsection?: string;
	arvdiffto?: string;
	arvdifftotext?: string;
	arvdifftotextpst?: boolean;
	arvcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	arvuser?: string;
	arvnamespace?: namespace | namespace[];
	arvstart?: timestamp;
	arvend?: timestamp;
	arvdir?: "newer" | "older";
	arvexcludeuser?: string;
	arvcontinue?: string;
	arvgeneratetitles?: boolean;
}

export interface ApiQueryAllLinksParams extends ApiQueryParams {
	atcontinue?: string;
	atfrom?: string;
	atto?: string;
	atprefix?: string;
	atunique?: boolean;
	atprop?: OneOrMore<"ids" | "title">;
	atnamespace?: namespace;
	atlimit?: limit;
	atdir?: "ascending" | "descending";
}

export interface ApiQueryAllUsersParams extends ApiQueryParams {
	aufrom?: string;
	auto?: string;
	auprefix?: string;
	audir?: "ascending" | "descending";
	augroup?: OneOrMore<"bot" | "bureaucrat" | "checkuser" | "staff" | "sysop">;
	auexcludegroup?: OneOrMore<"bot" | "bureaucrat" | "checkuser" | "staff" | "sysop">;
	aurights?: OneOrMore<"abusefilter-bypass-blocked-external-domains" | "abusefilter-hidden-log" | "abusefilter-hide-log" | "abusefilter-log" | "abusefilter-log-detail" | "abusefilter-log-private" | "abusefilter-modify" | "abusefilter-modify-blocked-external-domains" | "abusefilter-modify-global" | "abusefilter-modify-restricted" | "abusefilter-privatedetails" | "abusefilter-privatedetails-log" | "abusefilter-revert" | "abusefilter-view" | "abusefilter-view-private" | "ajaxpoll-view-results" | "ajaxpoll-view-results-before-vote" | "ajaxpoll-vote" | "apihighlimits" | "applychangetags" | "autoconfirmed" | "autocreateaccount" | "autopatrol" | "bigdelete" | "block" | "blockemail" | "bot" | "browsearchive" | "bypassgloopspam" | "changetags" | "checkuser" | "checkuser-log" | "checkuser-temporary-account" | "checkuser-temporary-account-log" | "createaccount" | "createpage" | "createtalk" | "delete" | "delete-redirect" | "deletechangetags" | "deletedhistory" | "deletedtext" | "deletelogentry" | "deleterevision" | "dpl_param_delete_rules" | "dpl_param_update_rules" | "edit" | "editcontentmodel" | "editinterface" | "editinterfacesite" | "editmyoptions" | "editmyprivateinfo" | "editmyusercss" | "editmyuserjs" | "editmyuserjson" | "editmyuserjsredirect" | "editmywatchlist" | "editprotected" | "editsemiprotected" | "editsitecss" | "editsitejs" | "editsitejson" | "editusercss" | "edituserjs" | "edituserjson" | "gadgets-definition-edit" | "gadgets-edit" | "globalblock" | "globalblock-exempt" | "globalblock-whitelist" | "gloopcontrol" | "hideuser" | "import" | "importupload" | "ipblock-exempt" | "manage-all-push-subscriptions" | "managechangetags" | "markbotedits" | "mergehistory" | "minoredit" | "move" | "move-categorypages" | "move-rootuserpages" | "move-subpages" | "movefile" | "mwoauthmanageconsumer" | "mwoauthmanagemygrants" | "mwoauthproposeconsumer" | "mwoauthsuppress" | "mwoauthupdateownconsumer" | "mwoauthviewprivate" | "mwoauthviewsuppressed" | "nominornewtalk" | "noratelimit" | "oathauth-api-all" | "oathauth-disable-for-user" | "oathauth-enable" | "oathauth-verify-user" | "oathauth-view-log" | "override-antispoof" | "override-export-depth" | "pagelang" | "patrol" | "patrolmarks" | "protect" | "protectsite" | "read" | "renameuser" | "reupload" | "reupload-own" | "reupload-shared" | "rollback" | "sboverride" | "searchdigest-admin" | "searchdigest-reader" | "sendemail" | "siteadmin" | "smw-vieweditpageinfo" | "spamblacklistlog" | "suppressionlog" | "suppressredirect" | "suppressrevision" | "tboverride" | "tboverride-account" | "titleblacklistlog" | "transcode-reset" | "transcode-status" | "unblockself" | "undelete" | "unwatchedpages" | "upload" | "upload_by_url" | "userrights" | "userrights-global" | "userrights-interwiki" | "viewmyprivateinfo" | "viewmywatchlist" | "viewsuppressed" | "writeapi">;
	auprop?: OneOrMore<"blockinfo" | "centralids" | "editcount" | "groups" | "implicitgroups" | "registration" | "rights">;
	aulimit?: limit;
	auwitheditsonly?: boolean;
	auactiveusers?: boolean;
	auattachedwiki?: string;
}

export interface ApiQueryAuthManagerInfoParams extends ApiQueryParams {
	amisecuritysensitiveoperation?: string;
	amirequestsfor?: "change" | "create" | "create-continue" | "link" | "link-continue" | "login" | "login-continue" | "remove" | "unlink";
	amimergerequestfields?: boolean;
	amimessageformat?: "html" | "none" | "raw" | "wikitext";
}

export interface ApiQueryBacklinksParams extends ApiQueryParams {
	bltitle?: string;
	blpageid?: number;
	blcontinue?: string;
	blnamespace?: namespace | namespace[];
	bldir?: "ascending" | "descending";
	blfilterredir?: "all" | "nonredirects" | "redirects";
	bllimit?: limit;
	blredirect?: boolean;
}

export interface ApiQueryBlocksParams extends ApiQueryParams {
	bkstart?: timestamp;
	bkend?: timestamp;
	bkdir?: "newer" | "older";
	bkids?: number | number[];
	bkusers?: string | string[];
	bkip?: string;
	bklimit?: limit;
	bkprop?: OneOrMore<"by" | "byid" | "expiry" | "flags" | "id" | "range" | "reason" | "restrictions" | "timestamp" | "user" | "userid">;
	bkshow?: OneOrMore<"!account" | "!ip" | "!range" | "!temp" | "account" | "ip" | "range" | "temp">;
	bkcontinue?: string;
}

export interface ApiQueryCategoriesParams extends ApiQueryParams {
	clprop?: OneOrMore<"hidden" | "sortkey" | "timestamp">;
	clshow?: OneOrMore<"!hidden" | "hidden">;
	cllimit?: limit;
	clcontinue?: string;
	clcategories?: string | string[];
	cldir?: "ascending" | "descending";
}

export interface ApiQueryCategoryInfoParams extends ApiQueryParams {
	cicontinue?: string;
}

export interface ApiQueryCategoryMembersParams extends ApiQueryParams {
	cmtitle?: string;
	cmpageid?: number;
	cmprop?: OneOrMore<"ids" | "sortkey" | "sortkeyprefix" | "timestamp" | "title" | "type">;
	cmnamespace?: namespace | namespace[];
	cmtype?: OneOrMore<"file" | "page" | "subcat">;
	cmcontinue?: string;
	cmlimit?: limit;
	cmsort?: "sortkey" | "timestamp";
	cmdir?: "asc" | "ascending" | "desc" | "descending" | "newer" | "older";
	cmstart?: timestamp;
	cmend?: timestamp;
	cmstarthexsortkey?: string;
	cmendhexsortkey?: string;
	cmstartsortkeyprefix?: string;
	cmendsortkeyprefix?: string;
	cmstartsortkey?: string;
	cmendsortkey?: string;
}

export interface MediaWikiCheckUserApiQueryCheckUserParams extends ApiQueryParams {
	curequest?: "edits" | "ipusers" | "userips";
	cutarget?: string;
	cureason?: string;
	culimit?: limit;
	cutimecond?: string;
	cuxff?: string;
	cutoken?: string;
}

export interface MediaWikiCheckUserApiQueryCheckUserLogParams extends ApiQueryParams {
	culuser?: string;
	cultarget?: string;
	culreason?: string;
	cullimit?: limit;
	culdir?: "newer" | "older";
	culfrom?: timestamp;
	culto?: timestamp;
	culcontinue?: string;
}

export interface CirrusSearchApiQueryBuildDocumentParams extends ApiQueryParams {
	cbbuilders?: OneOrMore<"content" | "links">;
	cblimiterprofile?: string;
}

export interface CirrusSearchApiQueryCompSuggestBuildDocParams extends ApiQueryParams {
	csbmethod?: string;
}

export interface CirrusSearchApiQueryCirrusDocParams extends ApiQueryParams {
	cdincludes?: string | string[];
}

export interface ApiQueryContributorsParams extends ApiQueryParams {
	pcgroup?: OneOrMore<"bot" | "bureaucrat" | "checkuser" | "staff" | "sysop">;
	pcexcludegroup?: OneOrMore<"bot" | "bureaucrat" | "checkuser" | "staff" | "sysop">;
	pcrights?: OneOrMore<"abusefilter-bypass-blocked-external-domains" | "abusefilter-hidden-log" | "abusefilter-hide-log" | "abusefilter-log" | "abusefilter-log-detail" | "abusefilter-log-private" | "abusefilter-modify" | "abusefilter-modify-blocked-external-domains" | "abusefilter-modify-global" | "abusefilter-modify-restricted" | "abusefilter-privatedetails" | "abusefilter-privatedetails-log" | "abusefilter-revert" | "abusefilter-view" | "abusefilter-view-private" | "ajaxpoll-view-results" | "ajaxpoll-view-results-before-vote" | "ajaxpoll-vote" | "apihighlimits" | "applychangetags" | "autoconfirmed" | "autocreateaccount" | "autopatrol" | "bigdelete" | "block" | "blockemail" | "bot" | "browsearchive" | "bypassgloopspam" | "changetags" | "checkuser" | "checkuser-log" | "checkuser-temporary-account" | "checkuser-temporary-account-log" | "createaccount" | "createpage" | "createtalk" | "delete" | "delete-redirect" | "deletechangetags" | "deletedhistory" | "deletedtext" | "deletelogentry" | "deleterevision" | "dpl_param_delete_rules" | "dpl_param_update_rules" | "edit" | "editcontentmodel" | "editinterface" | "editinterfacesite" | "editmyoptions" | "editmyprivateinfo" | "editmyusercss" | "editmyuserjs" | "editmyuserjson" | "editmyuserjsredirect" | "editmywatchlist" | "editprotected" | "editsemiprotected" | "editsitecss" | "editsitejs" | "editsitejson" | "editusercss" | "edituserjs" | "edituserjson" | "gadgets-definition-edit" | "gadgets-edit" | "globalblock" | "globalblock-exempt" | "globalblock-whitelist" | "gloopcontrol" | "hideuser" | "import" | "importupload" | "ipblock-exempt" | "manage-all-push-subscriptions" | "managechangetags" | "markbotedits" | "mergehistory" | "minoredit" | "move" | "move-categorypages" | "move-rootuserpages" | "move-subpages" | "movefile" | "mwoauthmanageconsumer" | "mwoauthmanagemygrants" | "mwoauthproposeconsumer" | "mwoauthsuppress" | "mwoauthupdateownconsumer" | "mwoauthviewprivate" | "mwoauthviewsuppressed" | "nominornewtalk" | "noratelimit" | "oathauth-api-all" | "oathauth-disable-for-user" | "oathauth-enable" | "oathauth-verify-user" | "oathauth-view-log" | "override-antispoof" | "override-export-depth" | "pagelang" | "patrol" | "patrolmarks" | "protect" | "protectsite" | "read" | "renameuser" | "reupload" | "reupload-own" | "reupload-shared" | "rollback" | "sboverride" | "searchdigest-admin" | "searchdigest-reader" | "sendemail" | "siteadmin" | "smw-vieweditpageinfo" | "spamblacklistlog" | "suppressionlog" | "suppressredirect" | "suppressrevision" | "tboverride" | "tboverride-account" | "titleblacklistlog" | "transcode-reset" | "transcode-status" | "unblockself" | "undelete" | "unwatchedpages" | "upload" | "upload_by_url" | "userrights" | "userrights-global" | "userrights-interwiki" | "viewmyprivateinfo" | "viewmywatchlist" | "viewsuppressed" | "writeapi">;
	pcexcluderights?: OneOrMore<"abusefilter-bypass-blocked-external-domains" | "abusefilter-hidden-log" | "abusefilter-hide-log" | "abusefilter-log" | "abusefilter-log-detail" | "abusefilter-log-private" | "abusefilter-modify" | "abusefilter-modify-blocked-external-domains" | "abusefilter-modify-global" | "abusefilter-modify-restricted" | "abusefilter-privatedetails" | "abusefilter-privatedetails-log" | "abusefilter-revert" | "abusefilter-view" | "abusefilter-view-private" | "ajaxpoll-view-results" | "ajaxpoll-view-results-before-vote" | "ajaxpoll-vote" | "apihighlimits" | "applychangetags" | "autoconfirmed" | "autocreateaccount" | "autopatrol" | "bigdelete" | "block" | "blockemail" | "bot" | "browsearchive" | "bypassgloopspam" | "changetags" | "checkuser" | "checkuser-log" | "checkuser-temporary-account" | "checkuser-temporary-account-log" | "createaccount" | "createpage" | "createtalk" | "delete" | "delete-redirect" | "deletechangetags" | "deletedhistory" | "deletedtext" | "deletelogentry" | "deleterevision" | "dpl_param_delete_rules" | "dpl_param_update_rules" | "edit" | "editcontentmodel" | "editinterface" | "editinterfacesite" | "editmyoptions" | "editmyprivateinfo" | "editmyusercss" | "editmyuserjs" | "editmyuserjson" | "editmyuserjsredirect" | "editmywatchlist" | "editprotected" | "editsemiprotected" | "editsitecss" | "editsitejs" | "editsitejson" | "editusercss" | "edituserjs" | "edituserjson" | "gadgets-definition-edit" | "gadgets-edit" | "globalblock" | "globalblock-exempt" | "globalblock-whitelist" | "gloopcontrol" | "hideuser" | "import" | "importupload" | "ipblock-exempt" | "manage-all-push-subscriptions" | "managechangetags" | "markbotedits" | "mergehistory" | "minoredit" | "move" | "move-categorypages" | "move-rootuserpages" | "move-subpages" | "movefile" | "mwoauthmanageconsumer" | "mwoauthmanagemygrants" | "mwoauthproposeconsumer" | "mwoauthsuppress" | "mwoauthupdateownconsumer" | "mwoauthviewprivate" | "mwoauthviewsuppressed" | "nominornewtalk" | "noratelimit" | "oathauth-api-all" | "oathauth-disable-for-user" | "oathauth-enable" | "oathauth-verify-user" | "oathauth-view-log" | "override-antispoof" | "override-export-depth" | "pagelang" | "patrol" | "patrolmarks" | "protect" | "protectsite" | "read" | "renameuser" | "reupload" | "reupload-own" | "reupload-shared" | "rollback" | "sboverride" | "searchdigest-admin" | "searchdigest-reader" | "sendemail" | "siteadmin" | "smw-vieweditpageinfo" | "spamblacklistlog" | "suppressionlog" | "suppressredirect" | "suppressrevision" | "tboverride" | "tboverride-account" | "titleblacklistlog" | "transcode-reset" | "transcode-status" | "unblockself" | "undelete" | "unwatchedpages" | "upload" | "upload_by_url" | "userrights" | "userrights-global" | "userrights-interwiki" | "viewmyprivateinfo" | "viewmywatchlist" | "viewsuppressed" | "writeapi">;
	pclimit?: limit;
	pccontinue?: string;
}

export interface ApiQueryDeletedRevisionsParams extends ApiQueryParams {
	drvprop?: OneOrMore<"comment" | "content" | "contentmodel" | "flags" | "ids" | "parsedcomment" | "roles" | "sha1" | "size" | "slotsha1" | "slotsize" | "tags" | "timestamp" | "user" | "userid" | "parsetree">;
	drvslots?: OneOrMore<"main">;
	drvlimit?: limit;
	drvexpandtemplates?: boolean;
	drvgeneratexml?: boolean;
	drvparse?: boolean;
	drvsection?: string;
	drvdiffto?: string;
	drvdifftotext?: string;
	drvdifftotextpst?: boolean;
	drvcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	drvstart?: timestamp;
	drvend?: timestamp;
	drvdir?: "newer" | "older";
	drvtag?: string;
	drvuser?: string;
	drvexcludeuser?: string;
	drvcontinue?: string;
}

export interface ApiQueryDeletedrevsParams extends ApiQueryParams {
	drstart?: timestamp;
	drend?: timestamp;
	drdir?: "newer" | "older";
	drfrom?: string;
	drto?: string;
	drprefix?: string;
	drunique?: boolean;
	drnamespace?: namespace;
	drtag?: string;
	druser?: string;
	drexcludeuser?: string;
	drprop?: OneOrMore<"comment" | "content" | "len" | "minor" | "parentid" | "parsedcomment" | "revid" | "sha1" | "tags" | "user" | "userid" | "token">;
	drlimit?: limit;
	drcontinue?: string;
}

export interface ApiQueryDuplicateFilesParams extends ApiQueryParams {
	dflimit?: limit;
	dfcontinue?: string;
	dfdir?: "ascending" | "descending";
	dflocalonly?: boolean;
}

export interface ApiQueryBacklinksParams extends ApiQueryParams {
	eititle?: string;
	eipageid?: number;
	eicontinue?: string;
	einamespace?: namespace | namespace[];
	eidir?: "ascending" | "descending";
	eifilterredir?: "all" | "nonredirects" | "redirects";
	eilimit?: limit;
}

export interface ApiQueryExternalLinksParams extends ApiQueryParams {
	ellimit?: limit;
	elcontinue?: string;
	elprotocol?: "" | "bitcoin" | "ftp" | "ftps" | "geo" | "git" | "gopher" | "http" | "https" | "irc" | "ircs" | "magnet" | "mailto" | "matrix" | "mms" | "news" | "nntp" | "redis" | "sftp" | "sip" | "sips" | "sms" | "ssh" | "svn" | "tel" | "telnet" | "urn" | "worldwind" | "xmpp";
	elquery?: string;
	elexpandurl?: boolean;
}

export interface TextExtractsApiQueryExtractsParams extends ApiQueryParams {
	exchars?: number;
	exsentences?: number;
	exlimit?: limit;
	exintro?: boolean;
	explaintext?: boolean;
	exsectionformat?: "plain" | "raw" | "wiki";
	excontinue?: number;
}

export interface ApiQueryExtLinksUsageParams extends ApiQueryParams {
	euprop?: OneOrMore<"ids" | "title" | "url">;
	eucontinue?: string;
	euprotocol?: "" | "bitcoin" | "ftp" | "ftps" | "geo" | "git" | "gopher" | "http" | "https" | "irc" | "ircs" | "magnet" | "mailto" | "matrix" | "mms" | "news" | "nntp" | "redis" | "sftp" | "sip" | "sips" | "sms" | "ssh" | "svn" | "tel" | "telnet" | "urn" | "worldwind" | "xmpp";
	euquery?: string;
	eunamespace?: namespace | namespace[];
	eulimit?: limit;
	euexpandurl?: boolean;
}

export interface ApiQueryFilearchiveParams extends ApiQueryParams {
	fafrom?: string;
	fato?: string;
	faprefix?: string;
	fadir?: "ascending" | "descending";
	fasha1?: string;
	fasha1base36?: string;
	faprop?: OneOrMore<"archivename" | "bitdepth" | "description" | "dimensions" | "mediatype" | "metadata" | "mime" | "parseddescription" | "sha1" | "size" | "timestamp" | "user">;
	falimit?: limit;
	facontinue?: string;
}

export interface ApiQueryFileRepoInfoParams extends ApiQueryParams {
	friprop?: OneOrMore<"canUpload" | "displayname" | "initialCapital" | "local" | "name" | "rootUrl" | "scriptDirUrl" | "thumbUrl" | "url">;
}

export interface ApiQueryBacklinkspropParams extends ApiQueryParams {
	fuprop?: OneOrMore<"pageid" | "redirect" | "title">;
	funamespace?: namespace | namespace[];
	fushow?: OneOrMore<"!redirect" | "redirect">;
	fulimit?: limit;
	fucontinue?: string;
}

export interface GadgetsApiQueryGadgetCategoriesParams extends ApiQueryParams {
	gcprop?: OneOrMore<"members" | "name" | "title">;
	gcnames?: string | string[];
}

export interface GadgetsApiQueryGadgetsParams extends ApiQueryParams {
	gaprop?: OneOrMore<"desc" | "id" | "metadata">;
	gacategories?: string | string[];
	gaids?: string | string[];
	gaallowedonly?: boolean;
	gaenabledonly?: boolean;
}

export interface GlobalBlockingApiQueryGlobalBlocksParams extends ApiQueryParams {
	bgstart?: timestamp;
	bgend?: timestamp;
	bgdir?: "newer" | "older";
	bgids?: number | number[];
	bgaddresses?: string | string[];
	bgip?: string;
	bglimit?: limit;
	bgprop?: OneOrMore<"address" | "by" | "expiry" | "id" | "range" | "reason" | "timestamp">;
}

export interface ApiQueryImageInfoParams extends ApiQueryParams {
	iiprop?: OneOrMore<"archivename" | "badfile" | "bitdepth" | "canonicaltitle" | "comment" | "commonmetadata" | "dimensions" | "extmetadata" | "mediatype" | "metadata" | "mime" | "parsedcomment" | "sha1" | "size" | "thumbmime" | "timestamp" | "uploadwarning" | "url" | "user" | "userid">;
	iilimit?: limit;
	iistart?: timestamp;
	iiend?: timestamp;
	iiurlwidth?: number;
	iiurlheight?: number;
	iimetadataversion?: string;
	iiextmetadatalanguage?: string;
	iiextmetadatamultilang?: boolean;
	iiextmetadatafilter?: string | string[];
	iiurlparam?: string;
	iibadfilecontexttitle?: string;
	iicontinue?: string;
	iilocalonly?: boolean;
}

export interface ApiQueryImagesParams extends ApiQueryParams {
	imlimit?: limit;
	imcontinue?: string;
	imimages?: string | string[];
	imdir?: "ascending" | "descending";
}

export interface ApiQueryBacklinksParams extends ApiQueryParams {
	iutitle?: string;
	iupageid?: number;
	iucontinue?: string;
	iunamespace?: namespace | namespace[];
	iudir?: "ascending" | "descending";
	iufilterredir?: "all" | "nonredirects" | "redirects";
	iulimit?: limit;
	iuredirect?: boolean;
}

export interface ApiQueryInfoParams extends ApiQueryParams {
	inprop?: OneOrMore<"associatedpage" | "displaytitle" | "editintro" | "linkclasses" | "notificationtimestamp" | "preloadcontent" | "protection" | "subjectid" | "talkid" | "url" | "varianttitles" | "visitingwatchers" | "watched" | "watchers" | "preload" | "readable">;
	inlinkcontext?: string;
	intestactions?: string | string[];
	intestactionsdetail?: "boolean" | "full" | "quick";
	intestactionsautocreate?: boolean;
	inpreloadcustom?: string;
	inpreloadparams?: string | string[];
	inpreloadnewsection?: boolean;
	ineditintrostyle?: "lessframes" | "moreframes";
	ineditintroskip?: string | string[];
	ineditintrocustom?: string;
	incontinue?: string;
}

export interface ApiQueryIWBacklinksParams extends ApiQueryParams {
	iwblprefix?: string;
	iwbltitle?: string;
	iwblcontinue?: string;
	iwbllimit?: limit;
	iwblprop?: OneOrMore<"iwprefix" | "iwtitle">;
	iwbldir?: "ascending" | "descending";
}

export interface ApiQueryIWLinksParams extends ApiQueryParams {
	iwprop?: OneOrMore<"url">;
	iwprefix?: string;
	iwtitle?: string;
	iwdir?: "ascending" | "descending";
	iwlimit?: limit;
	iwcontinue?: string;
	iwurl?: boolean;
}

export interface ApiQueryLangBacklinksParams extends ApiQueryParams {
	lbllang?: string;
	lbltitle?: string;
	lblcontinue?: string;
	lbllimit?: limit;
	lblprop?: OneOrMore<"lllang" | "lltitle">;
	lbldir?: "ascending" | "descending";
}

export interface ApiQueryLangLinksParams extends ApiQueryParams {
	llprop?: OneOrMore<"autonym" | "langname" | "url">;
	lllang?: string;
	lltitle?: string;
	lldir?: "ascending" | "descending";
	llinlanguagecode?: string;
	lllimit?: limit;
	llcontinue?: string;
	llurl?: boolean;
}

export interface ApiQueryLanguageinfoParams extends ApiQueryParams {
	liprop?: OneOrMore<"autonym" | "bcp47" | "code" | "dir" | "fallbacks" | "name" | "variantnames" | "variants">;
	licode?: string | string[];
	licontinue?: string;
}

export interface ApiQueryLinksParams extends ApiQueryParams {
	plnamespace?: namespace | namespace[];
	pllimit?: limit;
	plcontinue?: string;
	pltitles?: string | string[];
	pldir?: "ascending" | "descending";
}

export interface ApiQueryBacklinkspropParams extends ApiQueryParams {
	lhprop?: OneOrMore<"pageid" | "redirect" | "title">;
	lhnamespace?: namespace | namespace[];
	lhshow?: OneOrMore<"!redirect" | "redirect">;
	lhlimit?: limit;
	lhcontinue?: string;
}

export interface ApiQueryLogEventsParams extends ApiQueryParams {
	leprop?: OneOrMore<"comment" | "details" | "ids" | "parsedcomment" | "tags" | "timestamp" | "title" | "type" | "user" | "userid">;
	letype?: "" | "abusefilter" | "abusefilterblockeddomainhit" | "abusefilterprivatedetails" | "block" | "checkuser-temporary-account" | "contentmodel" | "create" | "delete" | "gblblock" | "gblrights" | "gloopcontrol" | "import" | "managetags" | "merge" | "move" | "mwoauthconsumer" | "newusers" | "oath" | "patrol" | "protect" | "renameuser" | "rights" | "smw" | "spamblacklist" | "suppress" | "tag" | "thanks" | "timedmediahandler" | "titleblacklist" | "upload";
	leaction?: "abusefilter/create" | "abusefilter/hit" | "abusefilter/modify" | "abusefilterblockeddomainhit/*" | "abusefilterprivatedetails/access" | "block/block" | "block/reblock" | "block/unblock" | "checkuser-private-event/*" | "checkuser-temporary-account/*" | "contentmodel/change" | "contentmodel/new" | "create/create" | "delete/delete" | "delete/delete_redir" | "delete/delete_redir2" | "delete/event" | "delete/restore" | "delete/revision" | "gblblock/dwhitelist" | "gblblock/gblock" | "gblblock/gblock2" | "gblblock/gunblock" | "gblblock/modify" | "gblblock/whitelist" | "gblrights/rights" | "gloopcontrol/*" | "import/interwiki" | "import/upload" | "interwiki/*" | "managetags/activate" | "managetags/create" | "managetags/deactivate" | "managetags/delete" | "merge/merge" | "move/move" | "move/move_redir" | "mwoauthconsumer/*" | "newusers/autocreate" | "newusers/byemail" | "newusers/create" | "newusers/create2" | "newusers/newusers" | "oath/*" | "patrol/autopatrol" | "patrol/patrol" | "protect/modify" | "protect/move_prot" | "protect/protect" | "protect/unprotect" | "renameuser/renameuser" | "rights/autopromote" | "rights/blockautopromote" | "rights/restoreautopromote" | "rights/rights" | "spamblacklist/*" | "suppress/block" | "suppress/delete" | "suppress/event" | "suppress/hide-afl" | "suppress/reblock" | "suppress/revision" | "suppress/unhide-afl" | "tag/update" | "thanks/*" | "timedmediahandler/resettranscode" | "titleblacklist/*" | "upload/overwrite" | "upload/revert" | "upload/upload";
	lestart?: timestamp;
	leend?: timestamp;
	ledir?: "newer" | "older";
	leuser?: string;
	letitle?: string;
	lenamespace?: namespace;
	leprefix?: string;
	letag?: string;
	lelimit?: limit;
	lecontinue?: string;
}

export interface ApiQueryMyStashedFilesParams extends ApiQueryParams {
	msfprop?: OneOrMore<"size" | "type">;
	msflimit?: limit;
	msfcontinue?: string;
}

export interface NotificationsApiEchoNotificationsParams extends ApiQueryParams {
	notwikis?: string | string[];
	notfilter?: OneOrMore<"!read" | "read">;
	notprop?: OneOrMore<"count" | "list" | "seenTime">;
	notsections?: OneOrMore<"alert" | "message">;
	notgroupbysection?: boolean;
	notformat?: "flyout" | "html" | "model" | "special";
	notlimit?: limit;
	notcontinue?: string;
	notunreadfirst?: boolean;
	nottitles?: string | string[];
	notbundle?: boolean;
	notnotifiertypes?: OneOrMore<"email" | "web">;
	notalertcontinue?: string;
	notalertunreadfirst?: boolean;
	notmessagecontinue?: string;
	notmessageunreadfirst?: boolean;
	notcrosswikisummary?: boolean;
}

export interface OATHAuthApiModuleApiQueryOATHParams extends ApiQueryParams {
	oathuser?: string;
	oathreason?: string;
}

export interface PageImagesApiQueryPageImagesParams extends ApiQueryParams {
	piprop?: OneOrMore<"name" | "original" | "thumbnail">;
	pithumbsize?: number;
	pilimit?: limit;
	pilicense?: "any" | "free";
	picontinue?: number;
	pilangcode?: string;
}

export interface ApiQueryPagePropNamesParams extends ApiQueryParams {
	ppncontinue?: string;
	ppnlimit?: limit;
}

export interface ApiQueryPagePropsParams extends ApiQueryParams {
	ppcontinue?: string;
	ppprop?: string | string[];
}

export interface ApiQueryPagesWithPropParams extends ApiQueryParams {
	pwppropname?: string;
	pwpprop?: OneOrMore<"ids" | "title" | "value">;
	pwpcontinue?: string;
	pwplimit?: limit;
	pwpdir?: "ascending" | "descending";
}

export interface ApiQueryPrefixSearchParams extends ApiQueryParams {
	pssearch?: string;
	psnamespace?: namespace | namespace[];
	pslimit?: limit;
	psoffset?: number;
}

export interface ApiQueryProtectedTitlesParams extends ApiQueryParams {
	ptnamespace?: namespace | namespace[];
	ptlevel?: OneOrMore<"autoconfirmed" | "sysop">;
	ptlimit?: limit;
	ptdir?: "newer" | "older";
	ptstart?: timestamp;
	ptend?: timestamp;
	ptprop?: OneOrMore<"comment" | "expiry" | "level" | "parsedcomment" | "timestamp" | "user" | "userid">;
	ptcontinue?: string;
}

export interface ApiQueryQueryPageParams extends ApiQueryParams {
	qppage?: "Ancientpages" | "BrokenRedirects" | "Deadendpages" | "DoubleRedirects" | "Fewestrevisions" | "GadgetUsage" | "ListDuplicatedFiles" | "Listredirects" | "Lonelypages" | "Longpages" | "MediaStatistics" | "Mostcategories" | "Mostimages" | "Mostinterwikis" | "Mostlinked" | "Mostlinkedcategories" | "Mostlinkedtemplates" | "Mostrevisions" | "Shortpages" | "Uncategorizedcategories" | "Uncategorizedimages" | "Uncategorizedpages" | "Uncategorizedtemplates" | "Unusedcategories" | "Unusedimages" | "Unusedtemplates" | "Unwatchedpages" | "Wantedcategories" | "Wantedfiles" | "Wantedpages" | "Wantedtemplates" | "Withoutinterwiki";
	qpoffset?: number;
	qplimit?: limit;
}

export interface ApiQueryRandomParams extends ApiQueryParams {
	rnnamespace?: namespace | namespace[];
	rnfilterredir?: "all" | "nonredirects" | "redirects";
	rnredirect?: boolean;
	rnlimit?: limit;
	rncontinue?: string;
}

export interface ApiQueryRecentChangesParams extends ApiQueryParams {
	rcstart?: timestamp;
	rcend?: timestamp;
	rcdir?: "newer" | "older";
	rcnamespace?: namespace | namespace[];
	rcuser?: string;
	rcexcludeuser?: string;
	rctag?: string;
	rcprop?: OneOrMore<"comment" | "flags" | "ids" | "loginfo" | "parsedcomment" | "patrolled" | "redirect" | "sha1" | "sizes" | "tags" | "timestamp" | "title" | "user" | "userid">;
	rcshow?: OneOrMore<"!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!redirect" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "redirect" | "unpatrolled">;
	rclimit?: limit;
	rctype?: OneOrMore<"categorize" | "edit" | "external" | "log" | "new">;
	rctoponly?: boolean;
	rctitle?: string;
	rccontinue?: string;
	rcgeneraterevisions?: boolean;
	rcslot?: "main";
}

export interface ApiQueryBacklinkspropParams extends ApiQueryParams {
	rdprop?: OneOrMore<"fragment" | "pageid" | "title">;
	rdnamespace?: namespace | namespace[];
	rdshow?: OneOrMore<"!fragment" | "fragment">;
	rdlimit?: limit;
	rdcontinue?: string;
}

export interface ApiQueryRevisionsParams extends ApiQueryParams {
	rvprop?: OneOrMore<"comment" | "content" | "contentmodel" | "flags" | "ids" | "parsedcomment" | "roles" | "sha1" | "size" | "slotsha1" | "slotsize" | "tags" | "timestamp" | "user" | "userid" | "parsetree">;
	rvslots?: OneOrMore<"main">;
	rvlimit?: limit;
	rvexpandtemplates?: boolean;
	rvgeneratexml?: boolean;
	rvparse?: boolean;
	rvsection?: string;
	rvdiffto?: string;
	rvdifftotext?: string;
	rvdifftotextpst?: boolean;
	rvcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/x-binary" | "less" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
	rvstartid?: number;
	rvendid?: number;
	rvstart?: timestamp;
	rvend?: timestamp;
	rvdir?: "newer" | "older";
	rvuser?: string;
	rvexcludeuser?: string;
	rvtag?: string;
	rvcontinue?: string;
}

export interface ApiQuerySearchParams extends ApiQueryParams {
	srsearch?: string;
	srnamespace?: namespace | namespace[];
	srlimit?: limit;
	sroffset?: number;
	srqiprofile?: "classic" | "classic_noboostlinks" | "empty" | "engine_autoselect" | "popular_inclinks" | "popular_inclinks_pv" | "wsum_inclinks" | "wsum_inclinks_pv";
	srwhat?: "nearmatch" | "text" | "title";
	srinfo?: OneOrMore<"rewrittenquery" | "suggestion" | "totalhits">;
	srprop?: OneOrMore<"categorysnippet" | "extensiondata" | "isfilematch" | "redirectsnippet" | "redirecttitle" | "sectionsnippet" | "sectiontitle" | "size" | "snippet" | "timestamp" | "titlesnippet" | "wordcount" | "hasrelated" | "score">;
	srinterwiki?: boolean;
	srenablerewrites?: boolean;
	srsort?: "create_timestamp_asc" | "create_timestamp_desc" | "incoming_links_asc" | "incoming_links_desc" | "just_match" | "last_edit_asc" | "last_edit_desc" | "none" | "random" | "relevance" | "user_random";
}

export interface ApiQuerySiteinfoParams extends ApiQueryParams {
	siprop?: OneOrMore<"autocreatetempuser" | "dbrepllag" | "defaultoptions" | "extensions" | "extensiontags" | "fileextensions" | "functionhooks" | "general" | "interwikimap" | "languages" | "languagevariants" | "libraries" | "magicwords" | "namespacealiases" | "namespaces" | "protocols" | "restrictions" | "rightsinfo" | "showhooks" | "skins" | "specialpagealiases" | "statistics" | "uploaddialog" | "usergroups" | "variables">;
	sifilteriw?: "!local" | "local";
	sishowalldb?: boolean;
	sinumberingroup?: boolean;
	siinlanguagecode?: string;
}

export interface ApiQueryStashImageInfoParams extends ApiQueryParams {
	siifilekey?: string | string[];
	siisessionkey?: string | string[];
	siiprop?: OneOrMore<"badfile" | "bitdepth" | "canonicaltitle" | "commonmetadata" | "dimensions" | "extmetadata" | "metadata" | "mime" | "sha1" | "size" | "thumbmime" | "timestamp" | "url">;
	siiurlwidth?: number;
	siiurlheight?: number;
	siiurlparam?: string;
}

export interface ApiQueryTagsParams extends ApiQueryParams {
	tgcontinue?: string;
	tglimit?: limit;
	tgprop?: OneOrMore<"active" | "defined" | "description" | "displayname" | "hitcount" | "source">;
}

export interface ApiQueryLinksParams extends ApiQueryParams {
	tlnamespace?: namespace | namespace[];
	tllimit?: limit;
	tlcontinue?: string;
	tltemplates?: string | string[];
	tldir?: "ascending" | "descending";
}

export interface ApiQueryTokensParams extends ApiQueryParams {
	type?: OneOrMore<"createaccount" | "csrf" | "login" | "patrol" | "rollback" | "userrights" | "watch">;
}

export interface ApiQueryBacklinkspropParams extends ApiQueryParams {
	tiprop?: OneOrMore<"pageid" | "redirect" | "title">;
	tinamespace?: namespace | namespace[];
	tishow?: OneOrMore<"!redirect" | "redirect">;
	tilimit?: limit;
	ticontinue?: string;
}

export interface MediaWikiTimedMediaHandlerApiTranscodeStatusParams extends ApiQueryParams {

}

export interface NotificationsApiEchoUnreadNotificationPagesParams extends ApiQueryParams {
	unpwikis?: string | string[];
	unpgrouppages?: boolean;
	unplimit?: limit;
}

export interface ApiQueryUserContribsParams extends ApiQueryParams {
	uclimit?: limit;
	ucstart?: timestamp;
	ucend?: timestamp;
	uccontinue?: string;
	ucuser?: string | string[];
	ucuserids?: number | number[];
	ucuserprefix?: string;
	uciprange?: string;
	ucdir?: "newer" | "older";
	ucnamespace?: namespace | namespace[];
	ucprop?: OneOrMore<"comment" | "flags" | "ids" | "parsedcomment" | "patrolled" | "size" | "sizediff" | "tags" | "timestamp" | "title">;
	ucshow?: OneOrMore<"!autopatrolled" | "!minor" | "!new" | "!patrolled" | "!top" | "autopatrolled" | "minor" | "new" | "patrolled" | "top">;
	uctag?: string;
	uctoponly?: boolean;
}

export interface ApiQueryUserInfoParams extends ApiQueryParams {
	uiprop?: OneOrMore<"acceptlang" | "blockinfo" | "cancreateaccount" | "centralids" | "changeablegroups" | "editcount" | "email" | "groupmemberships" | "groups" | "hasmsg" | "implicitgroups" | "latestcontrib" | "options" | "ratelimits" | "realname" | "registrationdate" | "rights" | "theoreticalratelimits" | "unreadcount">;
	uiattachedwiki?: string;
}

export interface ApiQueryUsersParams extends ApiQueryParams {
	usprop?: OneOrMore<"blockinfo" | "cancreate" | "centralids" | "editcount" | "emailable" | "gender" | "groupmemberships" | "groups" | "implicitgroups" | "registration" | "rights">;
	usattachedwiki?: string;
	ususers?: string | string[];
	ususerids?: number | number[];
}

export interface MediaWikiTimedMediaHandlerApiQueryVideoInfoParams extends ApiQueryParams {
	viprop?: OneOrMore<"archivename" | "badfile" | "bitdepth" | "canonicaltitle" | "comment" | "commonmetadata" | "derivatives" | "dimensions" | "extmetadata" | "mediatype" | "metadata" | "mime" | "parsedcomment" | "sha1" | "size" | "thumbmime" | "timestamp" | "uploadwarning" | "url" | "user" | "userid">;
	vilimit?: limit;
	vistart?: timestamp;
	viend?: timestamp;
	viurlwidth?: number;
	viurlheight?: number;
	vimetadataversion?: string;
	viextmetadatalanguage?: string;
	viextmetadatamultilang?: boolean;
	viextmetadatafilter?: string | string[];
	viurlparam?: string;
	vibadfilecontexttitle?: string;
	vicontinue?: string;
	vilocalonly?: boolean;
}

export interface ApiQueryWatchlistParams extends ApiQueryParams {
	wlallrev?: boolean;
	wlstart?: timestamp;
	wlend?: timestamp;
	wlnamespace?: namespace | namespace[];
	wluser?: string;
	wlexcludeuser?: string;
	wldir?: "newer" | "older";
	wllimit?: limit;
	wlprop?: OneOrMore<"comment" | "expiry" | "flags" | "ids" | "loginfo" | "notificationtimestamp" | "parsedcomment" | "patrol" | "sizes" | "tags" | "timestamp" | "title" | "user" | "userid">;
	wlshow?: OneOrMore<"!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!unread" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "unread">;
	wltype?: OneOrMore<"categorize" | "edit" | "external" | "log" | "new">;
	wlowner?: string;
	wltoken?: string;
	wlcontinue?: string;
}

export interface ApiQueryWatchlistRawParams extends ApiQueryParams {
	wrcontinue?: string;
	wrnamespace?: namespace | namespace[];
	wrlimit?: limit;
	wrprop?: OneOrMore<"changed">;
	wrshow?: OneOrMore<"!changed" | "changed">;
	wrowner?: string;
	wrtoken?: string;
	wrdir?: "ascending" | "descending";
	wrfromtitle?: string;
	wrtotitle?: string;
}

