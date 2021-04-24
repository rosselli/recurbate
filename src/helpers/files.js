const fs = require('fs');
const path = require('path');

const files = {
	readJSON: (filename) => {
		const file = path.resolve(filename);
		const data = fs.readFileSync(file);
		return JSON.parse(data);
	},
	writeJSON: (data, filename) => {
		const file = path.resolve(filename);
		fs.writeFile(file, JSON.stringify(data, null, '\t'), (error) => error && console.log(error.message));
	},
	removeHiddenFiles: (list) => list.filter(item => (!item.startsWith('.')) && item),
}

module.exports = files;