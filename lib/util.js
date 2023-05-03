const fs = require('fs');

const ENCODING = { encoding: 'utf8' };

exports.readFileSync = (filepath) => {
  try {
    return fs.readFileSync(filepath, ENCODING).trim();
  } catch (e) {}
};

exports.readFile = (filepath, callback) => {
  fs.readFile(filepath, ENCODING, (err, ctn) => {
    if (err) {
      return fs.readFile(filepath, ENCODING, callback);
    }
    callback(err, ctn);
  });
};

exports.toBase64 = (str) => {
  return Buffer.from(str).toString('base64');
};
