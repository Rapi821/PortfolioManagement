const express = require('express');
const router = express.Router();
const data = require('./model/index');

router.get('/akInfo', async function (req, res, next) {
    res.send(await data.getAktienInfo());
});

router.get('/akKurs', async function (req, res, next) {
    res.send(await data.getAktienKurs());
});

router.get('/akDetail/:isin', async function (req, res, next) {
    res.send(await data.getDetailAk(req.params.isin));
});

router.get('/akDetailKurs/:isin', async function (req, res, next) {
    res.send(await data.getDetailAkKurs(req.params.isin));
});

module.exports = router;
