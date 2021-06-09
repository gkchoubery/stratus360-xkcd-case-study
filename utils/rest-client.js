const axios = require('axios');

const BASE_URL = 'https://xkcd.com';

module.exports = axios.create({
  baseURL: BASE_URL
});