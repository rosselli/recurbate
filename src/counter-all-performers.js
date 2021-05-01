const files = require('./helpers/files');
const chalk = require('chalk');

const percentage = (counter, part) => parseInt((part/counter)*100);
const allPerformersFile = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-all-performers.json';
const allPerformers = files.readJSON(allPerformersFile).items;

const counter = {
	source: allPerformersFile,
	favorites: 0,
	rejected: {
		male: 0,
		trans: 0,
		manually: 0,
		total: 0
	},
	analyzed: 0,
	performers: allPerformers.length,
}

allPerformers.map(item => {
	if (item[3] == 'favorite') { counter.favorites ++; }
	if (item[3] == 'rejected-manually') { counter.rejected.manually ++; counter.rejected.total ++; }
	if (item[3] == 'rejected-male') { counter.rejected.male ++; counter.rejected.total ++; }
	if (item[3] == 'rejected-trans') { counter.rejected.trans ++; counter.rejected.total ++; }
	if (item[3] != '') { counter.analyzed ++; }
	counter.analyzedPercentage = percentage(counter.performers, counter.analyzed) + '%';
});
console.log(counter)
