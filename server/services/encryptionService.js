const crypto = require("crypto");

const encrypt = (data, key) => {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

const decrypt = (encryptedData, key) => {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
};

module.exports = {
  encrypt,
  decrypt,
};
