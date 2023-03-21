const fs = require('node:fs')

const shows = fs.readFileSync('list.txt').toString().split("\n");

function wew (arg){
    let items = "";
    for (let i = 0; i < arg.length; i++) {
        items += `<li>${arg[i]}</li>`;
    }
    return items;
}

document.querySelector("main").innerHTML = `
<ul>
${wew(shows)}
</ul>
`;
