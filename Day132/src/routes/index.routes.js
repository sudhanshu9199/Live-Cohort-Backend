const express = require('express');
const router = express.Router(); // Router-level middleware

router.use((req, res, next) => { 
    console.log('this middleware is b/w router & api');
    next()
    
})

router.get('/', (req, res) => {
    res.json({
        message: "welcome to the co-Hort!"
    })
})

module.exports = router;