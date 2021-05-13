const files = require('./helpers/files');
const urls = require('./helpers/urls');
const scraper = require('./helpers/scraper');
const validateParameters = require('./helpers/cli-validations');
const performers = require('./helpers/get-performers');
const toDownloadPath = './data/new-videos-to-download.json';
const toDownload = files.readJSON(toDownloadPath);
const toDownloadPerformers = toDownload.map(item => item.performer);

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
			data.map(newOne => {
				if (!currentFileNames.includes(newOne.videoName)) {
					currentPayload.items.push(itemsFormat(newOne));
					if (!toDownloadPerformers.includes(performer)) {
						const videoItem = { performer, videos: [newOne.videoLink] }
						toDownloadPerformers.push(performer);
						toDownload.push(videoItem);
					} else {
						const item = toDownload.find(item => item.performer == performer);
						!item.videos.includes(newOne.videoLink) && item.videos.push(newOne.videoLink);
					}
					counter++;
				}
			});
		}
		if (counter > 0) {
			console.log(performer, 'Currently', currentPayload.items.length, 'New items for ', counter);
			sort(currentPayload.items);
			files.writeJSON(toDownload, toDownloadPath);
			files.writeJSON(currentPayload, performerChecklist);
		}
	});
}

if (validateParameters.pages(2, 'checklist')) {
	const pages = parseInt(process.argv[2]) || 2;
	// const performer = 'gabyspencer_';
	// run(performer, pages)
	performers().map(performer => run(performer, pages));

}
