var fs = require('fs');

let pathDir = fs.readdirSync('./routes');

pathDir.forEach((v,i,arr) => {
    pathDir[i] = v.split('.')[0];
})

// console.log(pathDir)

module.exports = pathDir;