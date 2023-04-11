const fs = require('node:fs')

function showList() {
    const text = fs.readFileSync("./list.txt", "utf-8");
    const textByLine = text.split("\n")
    return textByLine;
}
module.exports = showList;