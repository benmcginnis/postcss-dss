const postcss = require('postcss');
const dss = require('dss');
const fs = require('fs');

function runDSS(rawCSS) {
    return new Promise((resolve) => {
        dss.parse(rawCSS, {}, (result) => {
            resolve(result);
        });
    });
}

function saveResults(result, filename) {
    return new Promise((resolve, reject) => {
        let strung = JSON.stringify(result, null, 2);
        fs.writeFile(filename, strung, null, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = postcss.plugin('postcss-dss', (options) => {
    for (let parser of options.parsers || []) {
        dss.parser(parser.atRule, parser.func);
    }
    return function (root) {
        return runDSS(root.toString()).then((res) => {
            return saveResults(res, options.fileName);
        });
    };
});
