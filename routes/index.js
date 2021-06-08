const express = require('express');
const axios = require('axios');
const router = express.Router();
const visitCount = require('../utils/visitCount');
const random = require('../utils/random');

const BASE_URL = 'https://xkcd.com';

const api = axios.create({
  baseURL: BASE_URL
});

const MAX_COMICS = 2473;

function parseComic(data) {
  const { num } = data;
  const left = (num - 1) > 0 ? num - 1 : false;
  const right = num < MAX_COMICS ? num + 1 : false;
  return {
    left, right,
    visits: visitCount(num),
    ...data
  };
}

router.get('/', async (req, res) => {
  const result = (await api.get(`/info.0.json`)).data;
  res.render('comic', parseComic(result));
});

router.get('/random', (req, res) => {
  res.redirect(`/${random(MAX_COMICS)}`);
});

router.get('/:id', async (req, res, next) => {
  let { id } = req.params;
  try {
    id = parseInt(id);
    const result = (await api.get(`/${id}/info.0.json`)).data;
    res.render('comic', parseComic(result));
  } catch (e) {
    next();
  }
});

module.exports = router;
