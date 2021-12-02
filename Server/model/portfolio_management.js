const { query } = require('../db/index');

//Test Routen
const getUsers = async () => (await query('SELECT * FROM users')).rows;
const getUserByEmail = async (email) => (await query('SELECT * FROM users WHERE email= $1', [email])).rows;
//Neuen User registrieren
const registerNewUser = async (newData) => (await query('INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) returning *', [newData.email, newData.firstname, newData.lastname, newData.password])).rows;
//Alle Competitions von einem User
const getCompetitionsByUser = async (user_id) => (await query("select cm.member_id, c.title, (select sum(buy_price) from competition_member_depot_lines where member_id= 1 and isin != '0000') as portfolio_value, cmdl.buy_price as cash, (select sum(buy_price) from competition_member_depot_lines where member_id= 1) as total, c.active from competition_members cm JOIN competitions c on c.competition_id= cm.competition_id JOIN competition_member_depot_lines cmdl on c.competition_id = cmdl.competition_id where cm.user_id=$1 and cmdl.isin= '0000';", [user_id])).rows;
//Erstellen einer neuen Competition
const createNewCompetition = async (newData) => (await query("INSERT INTO competitions (competition_id, creation_date, title, starting_money, active, end_date, owner_id, competition_code) VALUES (DEFAULT, $1, $2,"+ newData.starting_money+", DEFAULT, $3, $4, $5) returning *", [newData.creation_date, newData.title, newData.end_date, newData.user_id, newData.code])).rows;
//Alle Aktien in einem Depot
const getStocksFromDepot = async (member_id) => (await query("select isin, buy_price, count, (buy_price* count) as total, buy_date from competition_member_depot_lines where member_id= $1 and isin !='0000';", [member_id])).rows;

module.exports = {
  getUsers,
  getUserByEmail,
  registerNewUser,
  getCompetitionsByUser,
  createNewCompetition,
  getStocksFromDepot
};
