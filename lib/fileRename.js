// 文件重命名

const fse = require('fs-extra');
const path = require('path');
const getAppInfo = require('./getAppInfo');

module.exports = async (filepath, names) => {
    const appInfo = await getAppInfo(filepath);
    const newName = `${appInfo.name}${appInfo.id}--${names.certName}.ipa`;
    const newFilepath = path.join(path.parse(filepath).dir, newName);
    if (filepath !== newFilepath) {
        fse.moveSync(filepath, newFilepath);
    }
};
