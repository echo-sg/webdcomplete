const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Services = require('../models/services');

const serviceRouter = express.Router();

serviceRouter.use(bodyParser.json());

serviceRouter.route('/')
.get((req,res,next) => {
    Services.find({})
    .then((services) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(services);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Services.create(req.body)
    .then((service) => {
        console.log('Service Created ', service);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(service);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res) => {
    res.sendFile('services.html', {root : __dirname});
});

module.exports = serviceRouter;
