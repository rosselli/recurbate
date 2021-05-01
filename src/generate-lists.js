const files = require('./helpers/files');
const performers = require('./helpers/get-performers');
const blacklist = require('./helpers/get-blacklist');
const favorites = require('./helpers/get-favorites');
const exec = require('child_process').exec

exec('rm data/lists/general-use/*.json');
exec('rm data/lists/videos-to-cut/*.json');
exec('rm data/lists/videos-to-download/*.json');

performers().map(performer => {
	const performerChecklist = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-'+ performer +'.json';
	const performerList = files.readJSON(performerChecklist).items;

	const listToCutBegin = `{ \n\t"performer": "${performer}", \n\t"items": [\n`;
	let listToCutLines = '';
	const listToCutEnd = "\t]\n}";
	// const listToCut = { performer, items: []};
	const listToDownload = { performer, items: []};
	files.writeJSON({ performer, items: []}, './data/lists/general-use/' + performer + '.json');

	performerList.map(item => {
		const filename = `${performer}_${item[1]}.mp4`.replace(':', '-').replace(' ', '_');
		const templateToCut = { filename, start: '00:00:00', end: '00:00:00'}
		if (item[3] != 'deleted') {
			listToCutLines += `\t\t{ "filename": "${filename}", "start": "00:00:00", "end": "00:00:00"},\n`;
			// listToCut.items.push(templateToCut);
			// files.writeJSON(listToCut, './data/lists/videos-to-cut/' + performer + ' [toCut].json');
		}
// 			if (item[3] == 'deleted') { total.deleted ++; total.videos ++; }
		if (item[0] == '') {
			listToDownload.items.push(item[2]);
			files.writeJSON(listToDownload, './data/lists/videos-to-download/' + performer + ' [toDownload].json');
		}
	});
	files.writeText(listToCutBegin + listToCutLines + listToCutEnd, './data/lists/videos-to-cut/' + performer + ' [toCut].json');
});

files.writeJSON(performers(), './data/lists/performers.json');
files.writeJSON(blacklist(), './data/lists/blacklist.json');
files.writeJSON(favorites(), './data/lists/favorites.json');