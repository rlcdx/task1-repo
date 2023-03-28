const fs = require('node:fs')

function showList() {
    const text = fs.readFileSync("./list.txt", "utf-8");
    const textByLine = text.split("\n")
    console.log(textByLine)
    return textByLine;
}
module.exports = showList;