const counters = {
	favorites: (data) => {
		let counter = 0;
		data.filter(item => {
			if (item[3] == "favorite") counter ++;
		})
		return counter;
	},
	checked: (data) => {
		let toDo = 0;
		let done = 0;
		data.filter(item => {
			if (item[0] == "x") done ++;
			else toDo ++;
		})
		return { total: toDo + done, toDo, done, favorites: counters.favorites(data)};
	}
}
module.exports = counters