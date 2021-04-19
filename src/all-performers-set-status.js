const files = require('./helpers/files');
const info = require('./helpers/all-performers-counter');

const allPerformersFile = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-all-performers.json';
const allPerformers = files.readJSON(allPerformersFile);
const male = files.readJSON('./data/all-performers-male.json');
const trans = files.readJSON('./data/all-performers-trans.json');
const subscriptions = files.readJSON('./data/all-performers-subscriptions.json');
const favorites = files.readJSON('./data/all-performers-favorites.json');
const manually = files.readJSON('./data/all-performers-rejected-manually.json');

const reject = (name, checked, status) => {
	const allIndex = allPerformers.items.findIndex(performer => performer[1] === name);
	if (allIndex != -1) {
		allPerformers.items[allIndex][0] = checked;
		allPerformers.items[allIndex][3] = status;
	}
}

male.map(item => reject(item[1], null, 'rejected-male'));
trans.map(item => reject(item[1], null, 'rejected-trans'));
manually.map(item => reject(item[1], 'x', 'rejected-manually'));
favorites.map(item => reject(item[1], 'x', 'favorite'));
subscriptions.map(item => reject(item[1], 'x', 'favorite'));

files.writeJSON(allPerformers, allPerformersFile);
console.log(info(allPerformers));
