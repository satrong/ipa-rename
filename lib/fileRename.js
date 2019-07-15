// 文件重命名

const fse = require('fs-extra');
const path = require('path');

module.exports = (filepath, names) => {
    const newName = `${names.appName}--${names.certName}.ipa`;
    const newFilepath = path.join(path.parse(filepath).dir, newName);
    if (filepath !== newFilepath) {
        fse.moveSync(filepath, newFilepath);
    }
};
