const express = require('express');
const multer = require('multer');
const uploadFie = require('../services/storage.service');
const router = express.Router();

const upload = multer({storage: multer.memoryStorage()});


router.post('/songs', upload.single('audio'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const fileData = await uploadFie(req.file);
    
    res.status(201).json({
        message: 'Song created!',
        song: req.body
    });
    
})

module.exports = router;