module.exports = (allPerformers) => {
	const counter = {
		total: allPerformers.items.length,
		favorites: 0,
		blacklist: 0,
		itemsToAnalyze: 0,
	}

	allPerformers.items.map(item => {
		if (item[3] == 'rejected-male') counter.blacklist ++;
		if (item[3] == 'rejected-trans') counter.blacklist ++;
		if (item[3] == 'rejected-manually') counter.blacklist ++;
		if (item[0] == 'x' && item[3] == 'favorite') counter.favorites ++;
		if (item[0] == '') counter.itemsToAnalyze ++;
	})
	return counter;
}
