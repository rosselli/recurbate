const file = require('./helpers/files');
const urls = require('./helpers/urls');
const scraper = require('./helpers/scraper')
const blacklist = require('./helpers/get-blacklist')();
const favorites = require('./helpers/get-favorites')();
const validateParameters = require('./helpers/cli-validations');
const exec = require('child_process').exec

const run = (pages) => {
	exec('rm img/*.jpg');
	const recent = [];
	const favorited = [];
	const blacklisted = [];
	const duplicated = [];
	Array(pages).fill().map(async (_, index) => {
		console.log(urls.base(index + 1))
		const data = await scraper(urls.base(index + 1));
		data.map(item => {
			const inBlacklist = blacklist.includes(item.performer);
			const inFavoritelist = favorites.includes(item.performer);
			const duplicate = recent.some(inRecent => inRecent.performer === item.performer);
			duplicate && duplicated.push(item.performer) && console.log('duplicate', item.performer);
			inBlacklist && blacklisted.push(item.performer) && console.log('blacklisted', item.performer);
			inFavoritelist && favorited.push(item.performer) && console.log('favorited', item.performer);
			(!duplicate && !inBlacklist && !inFavoritelist) && recent.push(item)
		});
		console.log({
			recent: recent.length,
			favorites: favorites.length,
			blacklist: blacklist.length,
			favorited: favorited.length,
			blacklisted: blacklisted.length,
			duplicated: duplicated.length,
		});

		recent.map(item => file.downloadImage(item.videoImage, './img/' + item.performer + '.jpg', () => console.log('Image of ' + item.performer + ' was downloaded.')));
		file.writeJSON(recent, './data/recent.json');
	});
}

if (validateParameters.pages(2, 'recent')) {
	const pages = parseInt(process.argv[2]);
	run(pages);
}
