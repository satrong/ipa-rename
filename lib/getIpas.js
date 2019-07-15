// 遍历目录，读取所有的ipa文件路径
const fse = require('fs-extra');
const path = require('path');

module.exports = dir => {
    const list = [];
    const walk = d => {
        try {
            const stats = fse.statSync(d);
            if (stats.isFile()) {
                if (/\.ipa$/i.test(d)) {
                    list.push(d);
                }
            } else {
                const dirs = fse.readdirSync(d);
                dirs.forEach(el => walk(path.join(d, el)));
            }
        } catch (err) {
            console.log(`${d}目录不存在`);
        }
    }
    walk(dir);
    return list;
};