const fs = require('fs');
const files = require('./files');

module.exports = () => {
	const folder = '/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/';
	const filesList = files.removeHiddenFiles(fs.readdirSync(folder));
	if (filesList) {
		const list = [];
		filesList.map(item => {
			if (item.endsWith('.json')) {
				let cleaned = item.replace('.json', '').replace('checklist-', '');
				if (cleaned != 'all-performers' && cleaned != 'recurbate')
				list.push(cleaned)
			}
		});
		return list;
	}
}