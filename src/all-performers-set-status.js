const files = require('./helpers/files');
const info = require('./helpers/all-performers-counter');

const allPerformersFile = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-all-performers.json';
const allPerformers = files.readJSON(allPerformersFile);

const male = files.readJSON('./data/from-site/all-performers-male.json');
const trans = files.readJSON('./data/from-site/all-performers-trans.json');
const subscriptions = files.readJSON('./data/from-site/all-performers-subscriptions.json');
const favorites = files.readJSON('./data/all-performers-favorites-manually.json');
const manually = files.readJSON('./data/all-performers-rejected-manually.json');

const setStatus = (name, checked, status) => {
	const allIndex = allPerformers.items.findIndex(performer => performer[1] === name);
	if (allIndex != -1) {
		allPerformers.items[allIndex][0] = checked;
		allPerformers.items[allIndex][3] = status;
	}
}

(male.length > 0) && male.map(item => setStatus(item[1], null, 'rejected-male'));
(trans.length > 0) && trans.map(item => setStatus(item[1], null, 'rejected-trans'));
(subscriptions.length > 0) && subscriptions.map(item => setStatus(item[1], 'x', 'favorite'));
(manually.length > 0) && manually.map(item => setStatus(item[1], 'x', 'rejected-manually'));
(favorites.length > 0) && favorites.map(item => setStatus(item[1], 'x', 'favorite'));

files.writeJSON(allPerformers, allPerformersFile);
console.log(info(allPerformers));