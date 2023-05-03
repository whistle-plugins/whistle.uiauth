const fs = require('fs');
const os = require('os');
const path = require('path');
const { readFile, readFileSync, toBase64 } = require('./util');

const DEFAULT_AUTH = 'test:123';
const ACCOUNT_FILE = path.join(os.homedir(), '.whistle.uiauth.txt');
let account = readFileSync(ACCOUNT_FILE) || DEFAULT_AUTH;

let auth = toBase64(account);

fs.watchFile(ACCOUNT_FILE, () => {
  readFile(ACCOUNT_FILE, (err, ctn) => {
    if (err) {
      return;
    }
    ctn = (ctn && ctn.trim()) || DEFAULT_AUTH;
    if (ctn !== account) {
      account = ctn;
      auth = toBase64(account);
    }
  });
});

const checkAuth = (userAuth) => {
  if (!userAuth || typeof userAuth !== 'string') {
    return false;
  }
  return userAuth.substring(userAuth.indexOf(' ')).trim() === auth;
};

module.exports = async (req) => {
  // 可以在此异步获取新的 auth
  if (!checkAuth(req.headers.authorization) && !checkAuth(req.headers['proxy-authorization'])) {
    req.showLoginBox = true; // 显示登录框
    return false; // 需要登录
  }
  return true;
};
