const {readUsers, rewriteUsers} = require('./helper');


readUsers().then(users=>console.log(users));


