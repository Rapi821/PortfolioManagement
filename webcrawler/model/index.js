const { query } = require('../db');

//Alle verfügbaren Aktien
async function getAktienInfo() {
  let x = (await query('SELECT * FROM "public"."aktienInfo"')).rows;
  console.log(x);
  return x;
}

// Alle Kurse 
async function getAktienKurs() {
  return (await query('SELECT * FROM "public"."aktienKurs" ORDER BY zeit DESC'))
    .rows;
}

// Einzelne Aktie 
async function getDetailAk(isin) {
  return (
    await query(`SELECT * FROM "public"."aktienInfo" WHERE isin=$1`, [isin])
  ).rows;
}

//Kurse einzelner Aktie
async function getDetailAkKurs(isin) {
  return (
    await query(
      `SELECT * FROM "public"."aktienKurs" WHERE isin=$1  ORDER BY zeit DESC`,
      [isin]
    )
  ).rows;
}

module.exports = {
  getAktienInfo,
  getAktienKurs,
  getDetailAk,
  getDetailAkKurs,
};
