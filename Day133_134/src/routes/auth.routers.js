const express = require('express');
const userModel = require('../models/user.models.js')
const router = express.Router();

/*
POST /auth/register
POST /auth/login
GET /auth/user
GET /auth/logout
*/

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.create({
        username, password
    })

    res.status(201).json({
        message: "user registered!",
        user
    })
})

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    const isUserExists = await userModel.findOne({
        username: username
    })

    if (!isUserExists) {
        return res.status(401).json({
            message: "user account not found [invalid username]"
        })
    }
})

module.exports = router;