// 遍历目录，读取所有的ipa文件路径
const fse = require('fs-extra');
const path = require('path');

module.exports = dir => {
    const list = [];
    const walk = d => {
        fse.stat(d, (err, stats) => {
            if (err) {
                return console.log(`${d}目录不存在`);
            }
            if (stats.isFile()) {
                if (/\.ipa$/i.test(d)) {
                    list.push(d);
                }
            } else {
                const dirs = fse.readdirSync(d);
                dirs.forEach(el => walk(path.join(d, el)));
            }
        });
    }
    walk(dir);
    return list;
};