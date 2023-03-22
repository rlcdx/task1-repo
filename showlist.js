const fs = require('node:fs')

function showList() {
    const text = fs.readFileSync("./list.txt", "utf-8");
    var textByLine = text.split("\r\n")
    console.log(textByLine)

    let items = "";
    for (let i = 0; i < textByLine.length; i++) {
        items += `<li>${textByLine[i]}</li>`;
    }
    return items;
}

//let show = showList();

//console.log(show);

module.exports = showList;