module.exports = function () {
    const express = require('express');
    const consign = require('consign');
    const bodyParser = require('body-parser');
    const expressValidator = require('express-validator');
    const expressSession = require('express-session');

    const application = express();

    application.set('view engine', 'ejs');
    application.set('views', './application/views');

    application.use(express.static('application/public'));
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(expressValidator());
    application.use(expressSession({
        secret: 'f2e0af68b6d0e3ea6a2a2d0d300f5d1c29e7645501a93a2d33f8e202a5f2cf32',
        resave: false,
        saveUninitialized: false
    }));

    consign()
        .include('app/routes')
        .then('config/connection.js')
        .then('app/models')
        .then('app/controllers')
        .into(application);

    return application;
}