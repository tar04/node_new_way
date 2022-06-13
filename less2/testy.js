const path = require("path");
const fs = require("fs");

fs.readdir('./',(err, data) => {
    err && console.log(err)
    console.log(data)
})