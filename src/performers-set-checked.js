const files = require('./helpers/files');
const downloaded = files.readJSON('./data/set-videos-checked.json');

const parseVideoName = (video) => {
	const performer = video.split(/_\d\d\d\d/)[0];
	const videoName = video.split(performer + '_')[1]
		.replace(/(_)(\d\d)(-)/, ` $2:`)
		.replace('.mp4', '');
	return { performer, videoName }
}

const performers = [];
const videosList = []
downloaded.map(video => {
	const { performer, videoName } = parseVideoName(video);
	if (!performers.includes(performer)) {
		const videoItem = { performer, videos: [videoName] }
		performers.push(performer);
		videosList.push(videoItem);
	} else {
		const item = videosList.find(item => item.performer == performer);
		item.videos.push(videoName);
	}
});

let output = '';
videosList.map(item => {
	const performerChecklistPath = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-'+ item.performer +'.json';
	const performerChecklist = files.readJSON(performerChecklistPath);
	item.videos.map(video => {
		const index = performerChecklist.items.findIndex(file => file[1] === video)
		if (index != -1) {
			if (performerChecklist.items[index][0] == '') {
				performerChecklist.items[index][0] = 'x';
				output += `${item.performer}: video ${video} was updated.\n`;
			}
		}
	});
	files.writeJSON(performerChecklist, performerChecklistPath);
})

console.log(output);
