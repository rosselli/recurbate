const files = require('./files');

module.exports = () => {
	const allPerformersFile = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-all-performers.json';
	const allPerformers = files.readJSON(allPerformersFile);
	const favorites = [];

	allPerformers.items.map(item => (item[3] == 'favorite') && favorites.push(item[1]))
	files.writeJSON(favorites, './data/favorites.json');
	return favorites;
}