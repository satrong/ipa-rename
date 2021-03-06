// 获取证书名称
const cp = require('child_process');
const fse = require('fs-extra');
const temp = require('./tempPath');

module.exports = filepath => {
    return new Promise((resolve, reject) => {
        fse.emptyDirSync(temp);
        const unzip = cp.spawn('unzip', [filepath, '-d', temp]);

        unzip.stdout.on('data', (data) => {

        });

        unzip.stderr.on('data', (data) => {
            reject(String(data));
        });

        unzip.on('close', resolve);
    });
};
