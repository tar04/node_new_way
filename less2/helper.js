const fs = require("fs/promises");

async function readUsers() {

    const users = (await fs.readFile('./db/users.json')).toString()

    if (users) return JSON.parse(users)
    else return [];
}

async function rewriteUsers(users) {
    await fs.writeFile('./db/users.json', JSON.stringify(users));
    await rewriteReserve(users);
}

async function rewriteReserve(users) {
    await fs.writeFile('./db/reserve_users.json', JSON.stringify(users))
}

module.exports = {readUsers, rewriteUsers};
