// 读取ipa中info.plist信息
const fs = require('fs');
const extract = require('ipa-extract-info');

/**
 * 获取ipa包中的信息
 * @param {String} ipaPath ipa文件的路径
 * @returns Promise
 */
module.exports = async ipaPath => {
    return new Promise((resolve, reject) => {
        try {
            const fd = fs.openSync(ipaPath, 'r');
            extract(fd, async function (err, info) {
                if (err) return reject(err);
                const data = {};
                const { CFBundleIdentifier, CFBundleDisplayName, CFBundleShortVersionString } = info[0];
                data.id = CFBundleIdentifier;
                data.name = CFBundleDisplayName;
                data.version = CFBundleShortVersionString;
                resolve(data);
            });
        } catch (err) {
            reject(err);
        };
    });
};
