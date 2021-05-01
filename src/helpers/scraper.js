const axios = require("axios");
const axiosRetry = require('axios-retry');
const extractor = require("./extractors");

axiosRetry(axios, {
	retries: 3, // number of retries
	retryDelay: (retryCount) => {
		// console.log(`attempt: ${retryCount}`);
		return retryCount * 2000; // time interval between retries
	},
	retryCondition: (error) => {
		// if retry condition is not specified, by default idempotent requests are retried
		return error.response.status === 503;
	},
});

const scraper = (url) => axios.get(url)
	.then(res => extractor(res.data))
	.catch(err => console.log(err.message, url));
module.exports = scraper;
