// const crypto = require('crypto');

// const algorithm = 'aes-256-ctr';
// const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
// const iv = crypto.randomBytes(16);

// const encrypt = (text) => {

//     const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

//     const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

//     return {
//         iv: iv.toString('hex'),
//         content: encrypted.toString('hex')
//     };
// };

// const decrypt = (hash) => {

//     const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

//     const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

//     return decrpyted.toString();
// };

// module.exports = {
//     encrypt,
//     decrypt
// };

const CryptoJS = require("crypto-js");

const encryptWithAES = (text) => {
  const passphrase = "1#Bc?";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const passphrase = "1#Bc?";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = [
    encryptWithAES,
    decryptWithAES
];
