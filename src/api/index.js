const express = require('express');

const {Router} = express;
const router = new Router();

router.get('/api/test', (res) => res.sendStatus(200))

module.exports = router;
