const express = require('express');

const app = express(); // server created

app.get('/home', (req, res) => {
    /**
     * req.body
     * req.query
     * req.params

     * req.headers & req.cookies : Credential data are authentication data.
     */
    res.send('Welcome to Home Page')
})

app.get('/about', (req, res) => {
    res.send('You are at about Page')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
})