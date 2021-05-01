const files = require('./helpers/files');

const downloaded = files.readJSON('./data/set-videos-checked.json');
const performer = downloaded.performer;
const performerChecklistPath = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-'+ performer +'.json';
const performerChecklist = files.readJSON(performerChecklistPath);
let counter = 0;

downloaded.items.map(video => {
	const videoTitle = video.replace(/(_)(\d\d)(-)/, ` $2:`).replace('.mp4', '');
	performerChecklist.items.map(item => {
		if (item[1] == videoTitle) {
			item[0] = 'x';
			counter ++;
		}
	})
})
console.log(counter + ' videos of ' + performer + ' were updated.')

files.writeJSON(performerChecklist, performerChecklistPath);