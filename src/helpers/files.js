const fs = require('fs');
const path = require('path');
const request = require('request');

const files = {
	readJSON: (filename) => {
		const file = path.resolve(filename);
		const data = fs.readFileSync(file);
		return JSON.parse(data);
	},
	writeJSON: (data, filename) => {
		const file = path.resolve(filename);
		fs.writeFileSync(file, JSON.stringify(data, null, '\t'), (error) => error && console.log(error.message));
	},
	writeText: (data, filename) => {
		const file = path.resolve(filename);
		fs.writeFileSync(file, data, (error) => error && console.log(error.message));
	},
	downloadImage: (url, path, callback) => {
		request.head(url, (err, res, body) => {
			try {
				request(url)
					.pipe(fs.createWriteStream(path))
					.on('close', callback)
				.on('err', () => console.log(err))
			} catch (e) {
				console.log(e.message)
			}
		})
	},
	removeHiddenFiles: (list) => list.filter(item => (!item.startsWith('.')) && item),
}

module.exports = files;