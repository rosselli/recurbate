module.exports = {
	base: (page) => `https://recurbate.com/?page=${page}`,
	subscriptions: (page) => `https://recurbate.com/performer/subscriptions/?page=${page}`,
	performer: (performer, page) => `https://recurbate.com/performer/${performer}/?page=${page}`,
	performers: () => 'https://recurbate.com/performers/',
	play: (video) => `https://recurbate.com/play.php?video=${video}`,
}
