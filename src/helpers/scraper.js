const axios = require("axios");
const extractor = require("./extractors");

const scraper = (url) => axios.get(url)
	.then(res => extractor(res.data))
	.catch(err => console.log(err.message));
module.exports = scraper;
