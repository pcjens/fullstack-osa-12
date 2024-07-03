const { getAsync, setAsync } = require('../redis');
const express = require('express');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET statistics. */
router.get('/statistics', async (req, res) => {
  res.send({
    added_todos: Number.parseInt(await getAsync('added_todos') ?? '0'),
  });
});

module.exports = router;
