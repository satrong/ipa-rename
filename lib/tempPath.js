const path = require('path');
const isWin = process.platform === 'win32';

module.exports = path.join(isWin ? process.env.TEMP : process.env.HOME, '.ipa-rename');