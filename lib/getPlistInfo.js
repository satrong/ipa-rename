
const { exec } = require('child_process');
const path = require('path');
const fse = require('fs-extra');
const temp = require('./tempPath');

module.exports = async () => {
    return new Promise((resolve, reject) => {
        const dirs = fse.readdirSync(path.join(temp, 'Payload'));
        const appDir = dirs.find(el => /\.app$/i.test(el));
        if (!appDir) return reject('未找到`*.app`目录');

        const mobileprovisionPath = path.join(temp, `Payload/${appDir}/embedded.mobileprovision`);
        const plistPath = path.join(temp, 'ipaInfo.plist');

        const cmd = `security cms -D -i ${mobileprovisionPath} > ${plistPath}`;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            try {
                const content = fse.readFileSync(plistPath, 'utf8');
                resolve(content);
            } catch (err) {
                reject(err);
            }
        });
    });
};
