const file = require("./helpers/files");
const counters = require("./helpers/counters");

const original = file.readJSON('./temp/original.json').items;
const favorites = file.readJSON('./temp/favorites.json');

console.log(counters.favorites(original))
favorites.map(fav => {
	original.map(item => {
		if (item[2] == fav) {
			item[3] = 'favorite'
			console.log(`Favorite set on ${item[1]}.`)
		}
	})
})

const counter = counters.checked(original);
counter.favorites = counters.favorites(original);
console.log(counter);

