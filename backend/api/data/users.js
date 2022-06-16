/** @format */

const CryptoJS = require("crypto-js");

module.exports = [
  {
    email: "admin@example.com",
    password: CryptoJS.AES.encrypt("123456", "sachin0211").toString(),
    isAdmin: true,
  }
 
];
