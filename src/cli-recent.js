const file = require('./helpers/files');
const urls = require('./helpers/urls');
const scraper = require('./helpers/scraper')
const blacklist = require('./data/blacklist');
const validateParameters = require('./helpers/cli-validations');

const run = (pages) => {
	const recent = [];
	Array(pages).fill().map(async (_, index) => {
		console.log(urls.base(index + 1))
		const data = await scraper(urls.base(index + 1));
		data.map(item => {
			const notInRecent = !recent.some(inRecent => inRecent.performer === item.performer);
			const notInBlacklist = !blacklist.includes(item.performer)
			if (notInRecent && notInBlacklist) {
				recent.push(item)
			}
		});
		console.log(recent.length);
		file.writeJSON(recent, './data/recent.json');
	});
}

if (validateParameters.recent(2, 'recent')) {
	const pages = parseInt(process.argv[2]);
	run(pages);
}

