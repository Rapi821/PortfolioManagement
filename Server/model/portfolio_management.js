/* eslint-disable camelcase */
const { query } = require('../db/index');

//Test Routen
const getUsers = async () => (await query('SELECT * FROM users')).rows;
const getUserById = async (user_id) =>
  (await query('SELECT * FROM users WHERE user_id= $1', [user_id])).rows;
const getUserByEmail = async (email) =>
  (await query('SELECT * FROM users WHERE email= $1', [email])).rows;
//Neuen User registrieren
const registerNewUser = async (newData) =>
  (
    await query(
      'INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) returning *',
      [newData.email, newData.firstname, newData.lastname, newData.password]
    )
  ).rows;
//Alle Competitions von einem User
const getCompetitionsByUser = async (user_id) =>
  (
    await query(
      'select c.competition_id, c.title, c.active, c.end_date ,sum(buy_price) as total from competition_member_depot_lines JOIN competitions c on c.competition_id = competition_member_depot_lines.competition_id GROUP BY member_id, c.competition_id, c.title, c.end_date, c.active having member_id in (select member_id from competition_members where user_id=$1)',
      [user_id]
    )
  ).rows;
// (
//   await query(
//     "select cm.member_id, c.title, (select sum(buy_price) from competition_member_depot_lines where member_id= $1 and isin != '0000') as portfolio_value, cmdl.buy_price as cash, (select sum(buy_price) from competition_member_depot_lines where member_id= 1) as total, c.active from competition_members cm JOIN competitions c on c.competition_id= cm.competition_id JOIN competition_member_depot_lines cmdl on c.competition_id = cmdl.competition_id where cm.user_id=$1 and cmdl.isin= '0000';",
//     [user_id]
//   )
// ).rows;

const getCash = async (user_id) =>
  (
    await query(
      "select sum(buy_price) as cash, competition_id from competition_member_depot_lines group by member_id, isin, competition_id having member_id in (select member_id from competition_members where user_id=$1) and isin = '0000'",
      [user_id]
    )
  ).rows;

const getstockValue = async (user_id) =>
  // await query(
  //   "select sum(buy_price) as stocksValue, competition_id  from competition_member_depot_lines group by member_id, isin, competition_id having member_id in (select member_id from competition_members where user_id=$1) and isin != '0000'",
  //   [user_id]
  // )
  (
    await query(
      "select sum(stocksValue), competition_id from (SELECT sum(buy_price) as stocksValue, competition_id, member_id from competition_member_depot_lines GROUP BY competition_id, isin, member_id HAVING isin !='0000') as X group by competition_id, member_id having member_id in (select member_id from competition_members where user_id=$1)",
      [user_id]
    )
  ).rows;

//Erstellen einer neuen Competition wenn alles gegeben
const createNewCompetition = async (newData, user_id) =>
  (
    await query(
      'INSERT INTO competitions (competition_id, creation_date, title, starting_money, active, end_date, owner_id, competition_code) VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, $6)',
      [
        newData.creation_date,
        newData.title,
        newData.starting_money,
        newData.end_date,
        user_id,
        newData.code,
      ]
    )
  ).rows;
// User zu einer Competition hinzufügen und Startingmoney geben
const addUserToCompetition = async (newData, user_id) => {
  (
    await query(
      'insert into competition_members (member_id, user_id, competition_id) VALUES (DEFAULT, $1, (select competition_id from competitions where competition_code= $2))',
      [user_id, newData.code]
    )
  ).rows;
  (
    await query(
      "insert into competition_member_depot_lines (depot_line_id, isin, buy_price, count, competition_id, member_id) VALUES (DEFAULT, '0000', (select starting_money from competitions where competition_code= $1), 1, (select competition_id from competitions where competition_code= $1), (select member_id from competition_members where user_id=$2 and competition_id=(select competition_id from competitions where competition_code= $1)));",
      [newData.code, user_id]
    )
  ).rows;
};
//Alle Aktien in einem Depot
const getStocksFromDepot = async (competition_id, user_id) =>
  (
    await query(
      'select isin, buy_price, count from competition_member_depot_lines where member_id=(select member_id from competition_members where competition_members.competition_id = $1 and user_id=$2)',
      [competition_id, user_id]
    )
  ).rows;

const loginUser = async (user) => {
  // User password hashen
  const res = (
    await query('SELECT * FROM users WHERE email= $1 AND password=$2', [
      user.email,
      user.password,
    ])
  ).rows;
  if (res.length === 0) {
    return false;
  }
  return res[0];
};
// Neue aktien kaufen
const buyNewStocks = async (newData, user_id) =>
  (
    await query(
      'insert into competition_member_depot_lines (isin, buy_price, count, competition_id, member_id) VALUES ($1, $2::NUMERIC*$3::NUMERIC, $3::NUMERIC, $4, (select member_id from competition_members where user_id=$5 and competition_id=$4))',
      [
        newData.isin,
        newData.buy_price,
        newData.count,
        newData.competition_id,
        user_id,
      ]
    )
  ).rows;

// Geld von den gekauften Aktien abziehen
const removeMoney = async (newData, user_id) =>
  (
    await query(
      "update competition_member_depot_lines set buy_price= (select buy_price from competition_member_depot_lines where member_id= (select member_id from competition_members where user_id=$1 and competition_id=$2) and isin='0000')-$3 WHERE isin='0000' and member_id= (select member_id from competition_members where user_id=$1 and competition_id=$2)",
      [user_id, newData.competition_id, newData.buy_price * newData.count]
    )
  ).rows;

// Die gekauften Aktien in die Records eintragen
const addToRecords = async (newData, user_id) =>
  await query(
    "insert into depot_records (member_id, date, price, count, buy_sell, isin) VALUES ((select member_id from competition_members where user_id=$1 and competition_id=$2), $3, $4, $5, 'buy', $6)",
    [
      user_id,
      newData.competition_id,
      newData.buy_date,
      newData.buy_price,
      newData.count,
      newData.isin,
    ]
  );

// Überprüfung ob die Aktien bereits im Depot sind und nachgekauft wird oder
// ob es die ersten Aktien mit dem isin in dem Depot sind
const checkStockBought = async (newData, user_id) =>
  // console.log(user_id, newData),
  (
    await query(
      `select COUNT(*) from competition_member_depot_lines where 
    member_id= (select member_id from competition_members where 
      user_id= $1 and competition_id=$2) and isin= $3`,
      [user_id, newData.competition_id, newData.isin]
    )
  ).rows[0];

// Bereits gekaufte Aktie nachkaufen
const rebuyStocks = async (newData, user_id) =>
  await query(
    `update competition_member_depot_lines set buy_price=((select (buy_price) as 
      old_total from competition_member_depot_lines where member_id= (select member_id 
      from competition_members where user_id=$1 and competition_id=$2) and isin= $3)+$4::NUMERIC*$5::NUMERIC), 
      count=((select count from competition_member_depot_lines where member_id= 
      (select member_id from competition_members where user_id=$1 and competition_id=$2) 
      and isin= $3)+ $5::NUMERIC) where member_id= (select member_id from competition_members where user_id=$1
      and competition_id=$2) and isin= $3`,
    [
      user_id,
      newData.competition_id,
      newData.isin,
      newData.buy_price,
      newData.count,
    ]
  );

const getCompetition = async (comp_id, user_id) =>
  (
    await query(
      "select cs.name, cmdl.isin, cmdl.buy_price, cmdl.count from competition_member_depot_lines cmdl join competition_stocks cs on cs.isin = cmdl.isin where cmdl.member_id= (select member_id from competition_members where user_id=$1 and competition_id=$2) and cmdl.isin != '0000'",
      [user_id, comp_id]
    )
  ).rows;

const sellStocks = async (comp_id, user_id) =>
  (
    await query(
      "select cs.name, cmdl.isin, cmdl.buy_price, cmdl.count from competition_member_depot_lines cmdl join competition_stocks cs on cs.isin = cmdl.isin where cmdl.member_id= (select member_id from competition_members where user_id=$1 and competition_id=$2) and cmdl.isin != '0000'",
      [user_id, comp_id]
    )
  ).rows;

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  registerNewUser,
  getCompetitionsByUser,
  getCash,
  getstockValue,
  createNewCompetition,
  addUserToCompetition,
  getStocksFromDepot,
  loginUser,
  buyNewStocks,
  checkStockBought,
  rebuyStocks,
  removeMoney,
  addToRecords,
  getCompetition,
  sellStocks,
};
