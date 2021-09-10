require('dotenv').config();

const CryptoJS = require("crypto-js");

const encryptWithAES = (text) => {
  const passphrase = process.env.PASSPHRASE;
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const passphrase = process.env.PASSPHRASE;
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = {
    encryptWithAES,
    decryptWithAES
};
