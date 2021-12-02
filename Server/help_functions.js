const getRandomCode = (length = 10) => {
  // Declare all characters
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

const getCurrentDate = function () {
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  return cYear + "-" + cMonth + "-" + cDay;
};

// console.log(getCurrentDate());
// for (let i = 0; i < 10; i++) {
//     console.log(random());
// }

module.exports = {
  getRandomCode,
  getCurrentDate,
};
