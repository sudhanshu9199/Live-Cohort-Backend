const express = require('express');
const indexRoutes = require('./routes/index.routes.js')

const app = express(); // app

app.use((req, res, next) => { // Application-level middleware
    console.log('this middleware in b/w app & route');
    next()
    
})

app.use('/', indexRoutes) // route
module.exports = app;

/** Prepare router level interview related questions & answers. */