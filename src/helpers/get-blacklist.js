const files = require('./files');

module.exports = () => {
	const allPerformersFile = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-all-performers.json';
	const allPerformers = files.readJSON(allPerformersFile);
	const blacklist = [];

	allPerformers.items.map(item => {
		if (item[3] == 'rejected-male') blacklist.push(item[1]);
		if (item[3] == 'rejected-trans') blacklist.push(item[1]);
		if (item[3] == 'rejected-manually') blacklist.push(item[1]);
	})
	files.writeJSON(blacklist, './data/blacklist.json');
	return blacklist;
}