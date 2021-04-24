const files = require('./helpers/files');
const performers = require('./helpers/get-performers');

const counter = [];
performers().map(performer => {
	const performerChecklist = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-'+ performer +'.json';
	const list = files.readJSON(performerChecklist).items;
	const total = {
		performer,
		favorites: 0,
		deleted: 0,
		toDownload: 0,
		videos: 0,
	}
	list.map(item => {
		if (item[3] == 'favorite') { total.favorites ++; total.videos ++; }
		if (item[3] == 'deleted') { total.deleted ++; total.videos ++; }
		if (item[0] == '') { total.toDownload ++;  total.videos ++; }
	})
	counter.push(total);
});
console.log(counter)
