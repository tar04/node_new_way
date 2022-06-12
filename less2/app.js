const fs = require("fs");

fs.readFile('./db/users.json', (err, data) => {
    err && console.log(err);

    let users = JSON.parse(data.toString());

    users.push({
        name: "Ihor",
        age: 20,
        gender: "male"
    })
    console.log(users);
    fs.writeFile('./db/users.json', users.toString(), err1 => {
        err1 && console.log(err1);
    })
})