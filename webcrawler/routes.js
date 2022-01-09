const express = require('express');
const router = express.Router();
const data = require('./model/index');

//Alle verfügbaren Aktien
router.get('/akInfo', async function (req, res, next) {
    res.send(await data.getAktienInfo());
});

// Alle Kurse 
router.get('/akKurs', async function (req, res, next) {
    res.send(await data.getAktienKurs());
});

// Einzelne Aktie 
router.get('/akDetail/:isin', async function (req, res, next) {
    res.send(await data.getDetailAk(req.params.isin));
});

//Kurse einzelner Aktie
router.get('/akDetailKurs/:isin', async function (req, res, next) {
    res.send(await data.getDetailAkKurs(req.params.isin));
});

// Kurs zwischen Zeitrahmen
router.get('/kursByTime/:isin', async function (req, res, next) {
    res.send(await data.getKursbyTime(req.params.isin, req.query.date));
});

module.exports = router;
