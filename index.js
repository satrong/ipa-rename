// 获取证书名称
const unzip = require('./lib/unzip');
const GetPlistInfo = require('./lib/getPlistInfo');
const getName = require('./lib/getName');
const fileRename = require('./lib/fileRename');
const path = require('path');
const getIpas = require('./lib/getIpas');

// 获取文件名并重命名
const rename = async filepath => {
    try {
        await unzip(filepath);
        const plist = await GetPlistInfo();
        fileRename(filepath, getName(plist));
    } catch (err) {
        console.error(err);
    }
};

// 获取ipa文件并重命名
const getIpasAndRename = async filepath => {
    const isAbsolute = path.isAbsolute(filepath);
    if (!isAbsolute) {
        filepath = path.join(process.cwd(), filepath);
    }
    const ipaFilepaths = getIpas(filepath);
    for (let i = 0, len = ipaFilepaths.length; i < len; i++) {
        await rename(ipaFilepaths[i]);
    }
};


module.exports = () => {
    if (process.argv.length === 2) {
        console.log('请指定目录或ipa文件');
        return process.exit(0);
    }

    const filepaths = process.argv.slice(2);

    (async () => {
        for (let i = 0, len = filepaths.length; i < len; i++) {
            await getIpasAndRename(filepaths[i]);
        }
    })();
}
