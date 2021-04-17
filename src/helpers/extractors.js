const cheerio = require('cheerio');
const urls = require('./urls');

const deleteProperties = (properties, data) => {
	properties.map(item => delete data[item])
	return data;
}

module.exports = (data) => {
	const payload = [];
	const select = cheerio.load(data);
	const list = select('body').find('.video-thumb');
	const videos = deleteProperties(['_root', 'options', 'length', 'prevObject'], list);
	Object.values(videos).map(item => {
		const performer = select(item).find('.video-info > div > a').text().trim();
		let performerLink = urls.base() + select(item).find('.video-info > div > a').attr('href');
		performerLink = performerLink.replace('?page=undefined/', '')
		const videoName = select(item).find('.video-info > .video-info-sub').text().trim().split('  ')[1];
		let videoLink = urls.base() + select(item).find('a').attr('href');
		videoLink = videoLink.replace('?page=undefined/', '');
		const videoDuration = select(item).find('a > div > .video-time').text().trim();
		const videoImage = select(item).find('a > .video-splash').attr('data-src');
		payload.push({ performer, performerLink, videoName, videoImage, videoLink, videoDuration})
	})

	return payload;
}
