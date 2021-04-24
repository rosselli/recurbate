const urls = require('./helpers/urls');
const scraper = require('./helpers/scraper');
const validateParameters = require('./helpers/cli-validations');

const run = (performer, pages) => {
	Array(pages).fill().map(async (_, index) => {
		const data = await scraper(urls.performer(performer, index + 1));
		if (data.length > 0) {
			let log = '';
			let logPerformer = '';
			data.map(item => {
				logPerformer = `${item.performer} (${urls.performer(performer, index + 1)})\n`;
				log += `\t\t["", "${item.videoName}", "${item.videoLink}", ""],\n`;
			})
			console.log(logPerformer, log);
		}
	});
}

if (validateParameters.performersPages(2, 3,'checklist')) {
	const performer = process.argv[2];
	const pages = parseInt(process.argv[3]);
	run(performer, pages);
}
