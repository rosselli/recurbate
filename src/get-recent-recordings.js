const file = require('./helpers/files');
const urls = require('./helpers/urls');
const scraper = require('./helpers/scraper')
const blacklist = require('./helpers/get-blacklist')();
const validateParameters = require('./helpers/cli-validations');

const run = (pages) => {
	const recent = [];
	const blacklisted = [];
	const duplicated = [];
	Array(pages).fill().map(async (_, index) => {
		console.log(urls.base(index + 1))
		const data = await scraper(urls.base(index + 1));
		data.map(item => {
			const inBlacklist = blacklist.includes(item.performer);
			const duplicate = recent.some(inRecent => inRecent.performer === item.performer);
			duplicate && duplicated.push(item.performer) && console.log('duplicate', item.performer);
			inBlacklist && blacklisted.push(item.performer) && console.log('blacklisted', item.performer);
			(!duplicate && !inBlacklist) && recent.push(item)
		});
		console.log({
			recent: recent.length,
			blacklist: blacklist.length,
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
