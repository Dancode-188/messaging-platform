const crypto = require("crypto");

const encrypt = (data, key) => {
  const derivedKey = crypto.scryptSync(key, "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", derivedKey, iv);
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return iv.toString("hex") + encryptedData;
};

const decrypt = (encryptedData, key) => {
  const derivedKey = crypto.scryptSync(key, "salt", 32);
  const iv = Buffer.from(encryptedData.slice(0, 32), "hex");
  const data = encryptedData.slice(32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", derivedKey, iv);
  let decryptedData = decipher.update(data, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
};

module.exports = { encrypt, decrypt };
