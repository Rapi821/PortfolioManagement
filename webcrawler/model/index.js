const { query } = require('../db');

async function getAktienInfo() {
  let x = (await query('SELECT * FROM "public"."aktienInfo"')).rows;
  console.log(x);
  return x;
}

module.exports = {
  getAktienInfo,
};
