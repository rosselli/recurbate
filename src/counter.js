const files = require('./helpers/files');
const performers = require('./helpers/get-performers');
const chalk = require('chalk');

const counter = [];
const percentage = (total, part) => parseInt((part/total)*100);
performers().map(performer => {
	const performerChecklist = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-'+ performer +'.json';
	const list = files.readJSON(performerChecklist).items;
	const total = {
		performer,
		favorites: 0,
		deleted: 0,
		watched: 0,
		toDownload: 0,
		videos: list.length,
	}
	list.map(item => {
		if (item[3] == 'favorite') { total.favorites ++; total.watched ++; }
		if (item[3] == 'deleted') { total.deleted ++; total.watched ++; }
		if (item[0] == '') { total.toDownload ++; }
	})
	total.watchedPercentage = percentage(total.videos, total.watched)
	counter.push(total);
	if (total.watchedPercentage > 0) {
		const clPerformer = chalk.cyan(performer);
		const clPercentage = chalk.yellow(total.watchedPercentage + '%');
		const clWatched = chalk.magenta('watched: ') + chalk.green(total.watched + ' of ' + total.videos)
		const clDownloaded = chalk.blue('downloaded: ') + chalk.red((total.videos - total.toDownload) + ' of ' + total.videos)
		const message = `${clPerformer} ${clPercentage} ${clWatched} ${clDownloaded}`
		console.log(message);
	}
});
// console.log(counter)
