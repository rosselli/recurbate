const files = require('./helpers/files');
const performers = require('./helpers/get-performers');
const chalk = require('chalk');
const table = require('text-table');

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
	total.watchedPercentage = percentage(total.videos, total.watched);
	total.downloadedPercentage = percentage(total.videos, total.videos - total.toDownload);
	counter.push(total);
});

const output = [];
const outputGreaterThan70 = [];
const outputBetween70And20 = [];
const outputLessThan20 = [];

counter.map(item => {
	const clPerformer = chalk.cyan(item.performer);
	const clWatchedPercentage = chalk.yellow(item.watchedPercentage + '%');
	const clDownloadedPercentage = chalk.yellow(item.downloadedPercentage + '%');
	const clWatched = chalk.blue('watched') + chalk.green(' (' + item.watched + ' of ' + item.videos + ')')
	const clDownloaded = chalk.blue('downloaded') + chalk.green(' (' + (item.videos - item.toDownload) + ' of ' + item.videos + ')')

	if (item.watchedPercentage >= 70) {
		outputGreaterThan70.push([clPerformer, `${clWatchedPercentage} ${clWatched}`, `${clDownloadedPercentage} ${clDownloaded}`]);
	}

	if (item.watchedPercentage > 20 && item.watchedPercentage < 70) {
		outputBetween70And20.push([clPerformer, `${clWatchedPercentage} ${clWatched}`, `${clDownloadedPercentage} ${clDownloaded}`]);
	}

	if (item.watchedPercentage <= 20 && item.watchedPercentage > 0) {
		outputLessThan20.push([clPerformer, `${clWatchedPercentage} ${clWatched}`, `${clDownloadedPercentage} ${clDownloaded}`]);
	}

	if (item.watchedPercentage > 0) {
		output.push([clPerformer, `${clWatchedPercentage} ${clWatched}`, `${clDownloadedPercentage} ${clDownloaded}`]);
	}
});

// console.log(table(output))
console.log('Greater than 70%\n', table(outputGreaterThan70))
console.log('Between 70% and 20%\n', table(outputBetween70And20))
console.log('Less than 20%\n', table(outputLessThan20))
