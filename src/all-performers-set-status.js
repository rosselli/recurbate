const files = require('./helpers/files');
const info = require('./helpers/all-performers-counter');

const allPerformersFile = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-all-performers.json';
const allPerformers = files.readJSON(allPerformersFile);
const sort = (data) => data.sort((a, b) => (a[1] > b[1]) ? 1 : -1);

const appendNew = () => {
	const all = files.readJSON('./data/from-site/all-performers.json');
	const currentList = [];
	console.log('Before: ', allPerformers.items.length)
	allPerformers.items.map(item => currentList.push(item[1]));
	all.map(newOne => (!currentList.includes(newOne[1])) && allPerformers.items.push(newOne));
	sort(allPerformers.items);
	console.log('After', allPerformers.items.length)
	files.writeJSON(allPerformers, allPerformersFile);
}

const setStatus = (name, checked, status) => {
	const allIndex = allPerformers.items.findIndex(performer => performer[1] === name);
	if (allIndex != -1) {
		allPerformers.items[allIndex][0] = checked;
		allPerformers.items[allIndex][3] = status;
	}
}

const reject = () => {
	const male = files.readJSON('./data/from-site/all-performers-male.json');
	const trans = files.readJSON('./data/from-site/all-performers-trans.json');
	(male.length > 0) && male.map(item => setStatus(item[1], null, 'rejected-male'));
	(trans.length > 0) && trans.map(item => setStatus(item[1], null, 'rejected-trans'));
	files.writeJSON(allPerformers, allPerformersFile);
}

const rejectManually = () => {
	const rejectedManually = files.readJSON('./data/all-performers-rejected-manually.json');
	(rejectedManually.length > 0) && rejectedManually.map(item => setStatus(item, 'x', 'rejected-manually'));
	files.writeJSON(allPerformers, allPerformersFile);
}

const subscriptions = () => {
	const subscriptions = files.readJSON('./data/from-site/all-performers-subscriptions.json');
	(subscriptions.length > 0) && subscriptions.map(item => setStatus(item[1], 'x', 'favorite'));
	files.writeJSON(allPerformers, allPerformersFile);
}

const favorites = () => {
	const favorites = files.readJSON('./data/all-performers-favorites-manually.json');
	(favorites.length > 0) && favorites.map(item => setStatus(item, 'x', 'favorite'));
	files.writeJSON(allPerformers, allPerformersFile);
}

process.argv[2] == undefined && console.log('The Command is missing.');
process.argv[2] == 'append-new' && appendNew();
process.argv[2] == 'reject' && reject();
process.argv[2] == 'reject-manually' && rejectManually();
process.argv[2] == 'subscriptions' && subscriptions();
process.argv[2] == 'favorites' && favorites();

console.log(info(allPerformers));
