const file = require('./helpers/files');
const urls = require('./helpers/urls');
const scraper = require('./helpers/scraper')
const blacklist = require('./helpers/get-blacklist')();
const favoritelist = require('./helpers/get-favorites')();
const validateParameters = require('./helpers/cli-validations');

const run = (pages) => {
	const recent = [];
	const favorited = [];
	const blacklisted = [];
	const duplicated = [];
	Array(pages).fill().map(async (_, index) => {
		console.log(urls.base(index + 1))
		const data = await scraper(urls.base(index + 1));
		data.map(item => {
			const inBlacklist = blacklist.includes(item.performer);
			const inFavoritelist = favoritelist.includes(item.performer);
			const duplicate = recent.some(inRecent => inRecent.performer === item.performer);
			duplicate && duplicated.push(item.performer) && console.log('duplicate', item.performer);
			inBlacklist && blacklisted.push(item.performer) && console.log('blacklisted', item.performer);
			inFavoritelist && favorited.push(item.performer) && console.log('favorited', item.performer);
			(!duplicate && !inBlacklist) && recent.push(item)
		});
		console.log({
			recent: recent.length,
			favoritelist: favoritelist.length,
			blacklist: blacklist.length,
			favorited: favorited.length,
			blacklisted: blacklisted.length,
			duplicated: duplicated.length,
		});
		file.writeJSON(recent, './data/recent.json');
	});
}

if (validateParameters.recent(2, 'recent')) {
	const pages = parseInt(process.argv[2]);
	run(pages);
}
