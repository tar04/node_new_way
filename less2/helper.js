const fs = require("fs/promises");

async function readUsers() {
    const data = await fs.readFile('./db/users.json');

    return data.toString() ? JSON.parse(data.toString()) : []
}

async function rewriteUsers(users) {
    await fs.writeFile('./db/users.json', JSON.stringify(users));
    await rewriteReserve(users);
}

async function rewriteReserve(users) {
    await fs.writeFile('./db/reserve_users.json', JSON.stringify(users))
}

module.exports = {readUsers, rewriteUsers};
