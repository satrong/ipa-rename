// 从字符串中获取证书的名称
module.exports = xml => {
    const appNameMatched = xml.match(/<key>AppIDName<\/key>\s*<string>([^<]+)<\/string>/)
    const certNamematched = xml.match(/<key>Name<\/key>\s*<string>([^<]+)<\/string>/m);
    return {
        appName: appNameMatched ? appNameMatched[1] : '',
        certName: certNamematched ? certNamematched[1] : '',
    };
};
