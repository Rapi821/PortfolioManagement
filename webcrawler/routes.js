const express = require('express');
const router = express.Router();
const data = require('./model/index');

router.get('/akInfo', async function (req, res, next) {
    res.send(await data.getAktienInfo());
});

module.exports = router;
