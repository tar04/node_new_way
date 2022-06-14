const express = require("express");
const {readUsers, rewriteUsers} = require('./helper');

const app = express();
app.use(express.json())

const port = 5000;

app.get('/users', (req, res) => {
    readUsers().then(users =>
        res.json(users)
    );
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

    readUsers().then(async users => {

        const {name, age, gender, id} = req.body

        if (name && age && gender) {

            const userId = users.length ? users[users.length - 1].id + 1 : 1;

            const newUser = {
                id: userId,
                name,
                age,
                gender
            };

            users.push(newUser);
            await rewriteUsers(users);

            if (id) {
                res.status(201).json(`User been created with id ${userId}`);
            } else {
                res.status(201).json('User been created');
            }
        } else {
            res.status(409).json('Fill user with data');
        }

    })

});

app.put('/users/:id', (req, res) => {
    const userId = +req.params.id;

    readUsers().then(async users => {

        const user = users.find(user => user.id === userId);

        const {name, age, gender} = req.body

        if (!user) {
            res.status(404).json(`No user with id ${userId}`);
            return;
        }

        if (name && age && gender) {
            const userForUpdate = {
                id: userId,
                name,
                age,
                gender
            };

            const idOfUpdatedUser = users.findIndex(user => user.id === userId);
            users[idOfUpdatedUser] = userForUpdate;
            await rewriteUsers(users);

            res.status(202).json(`User with id ${userId} was updated`)

        } else {
            res.status(409).json('Fill user with data');
        }
    })
})

app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;

    readUsers().then(async users => {
        const user = users.find(user => user.id === id);

        if (!user) {
            res.status(404).json(`No user with id ${id}`);
            return;
        }

        const newUsers = users.filter(user => user.id !== id);
        await rewriteUsers(newUsers);
        res.status(204).json('User was successfully deleted')
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})