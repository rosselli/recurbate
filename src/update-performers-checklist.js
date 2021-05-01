const files = require('./helpers/files');
const urls = require('./helpers/urls');
const scraper = require('./helpers/scraper');
const validateParameters = require('./helpers/cli-validations');
const performers = require('./helpers/get-performers');

const run = (performer, pages) => {
	const performerChecklist = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-'+ performer +'.json';
	const currentPayload = files.readJSON(performerChecklist);
	const currentFileNames = [];
	currentPayload.items.map(item => currentFileNames.push(item[1]));
	const itemsFormat = (item) => ["", item.videoName, item.videoLink, ""]
	const sort = (data) => data.sort((a, b) => (a[1] < b[1]) ? 1 : -1);

	Array(pages).fill().map(async (_, index) => {
		let counter = 0;
		const data = await scraper(urls.performer(performer, index + 1));
		if (data && data.length > 0) {
			data.map(newOne => !currentFileNames.includes(newOne.videoName) && currentPayload.items.push(itemsFormat(newOne)) && counter++);
		}
		if (counter > 0) {
			console.log(performer, 'Currently', currentPayload.items.length, 'New items for ', counter);
			sort(currentPayload.items);
			files.writeJSON(currentPayload, performerChecklist);
		}
	});
}

if (validateParameters.pages(2, 'checklist')) {
	const pages = parseInt(process.argv[2]) || 2;
	// const performer = 'violetta_danvers';
	// run(performer, pages)
	performers().map(performer => run(performer, pages));
}
