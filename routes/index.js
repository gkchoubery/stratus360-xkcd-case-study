const express = require('express');
const axios = require('axios');
const router = express.Router();
const visitCount = require('../visitCount');

const BASE_URL = 'https://xkcd.com/';

const api = axios.create({
  baseURL: BASE_URL
});

router.get('/', async (req, res, next) => {
  res.redirect('/1');
});

router.get('/:id', async (req, res, next) => {
  let { id } = req.params;
  try {
    id = parseInt(id);
    const result = (await api.get(`${id}/info.0.json`)).data;
    const left = (id - 1) > 0 ? id - 1 : false;
    const right = id + 1;
    const data = {
      left, right, 
      visits: visitCount(id),
      ...result
    };
    res.render('comic', data);
  } catch (e) {
    next();
  }
});

module.exports = router;
