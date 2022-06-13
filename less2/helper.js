const fs = require("fs/promises");

async function readUsers() {
    return JSON.parse((await fs.readFile('./db/users.json')).toString());
}

async function rewriteUsers(users) {
   await fs.writeFile('./db/users.json', JSON.stringify(users))
}

module.exports = {readUsers, rewriteUsers};
