const express = require("express");

const {readUsers, rewriteUsers} = require('./helper');

const app = express();

const port=5000;

app.get('/',(req, res) => {


    console.log()
    res.end('nodejs!')
})



app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})