const express = require("express");

const {readUsers, rewriteUsers} = require('./helper');

const app = express();
app.use(express.json())

const port = 5000;

app.get('/users', (req, res) => {
    readUsers().then(users => res.json(users));
});

app.get('/users/:id', (req, res) => {
    const id = +req.params.id;

    readUsers().then(users => {
        const user = users.find(user => user.id === id);

        if (isNaN(id) || id < 0) {
            res.status(404).json('Enter valid ID');
            return;
        }

        if (!user) {
            res.status(404).json(`No user with id ${id}`);
            return;
        }

        res.json(user);
    });
});

app.post('/users', (req, res) => {

    const {name, age, gender} = req.body;

    readUsers().then(async users => {
        const newId = users.slice(-1)[0].id + 1

        const newUser = {
            id: newId,
            name,
            age,
            gender,
        };

        users.push(newUser);
        await rewriteUsers(users);

        res.status(201).json('User been created');
    })

});

app.put('/users/:id', (req, res) => {
    const id = +req.params.id;

    readUsers().then(async users => {

        const userForUpdate = {
            id,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
        }

        const idOfUpdatedUser = users.findIndex(user => user.id === id);

        users[idOfUpdatedUser] = userForUpdate;
        await rewriteUsers(users);
        res.status(202).json(`User with id ${id} was updated`)
    })
})

app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;

    readUsers().then(async users => {
        const newUsers = users.filter(user => user.id !== id);
        await rewriteUsers(newUsers);
        res.status(204).json('User was successfully deleted')
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})