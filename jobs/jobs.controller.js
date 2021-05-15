const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jobService = require('./job.service');
const validateRequest = require('_helpers/validate-request');
const authorize = require('_helpers/authorize')

// routes

router.get('/jobs', getAll);
router.post('/add', addSchema, add);

module.exports = router;

function getAll(req, res, next) {
    jobService.getAll()
        .then(jobs => res.json(jobs))
        .catch(next);
}

function addSchema(req, res, next) {
    const schema = Joi.object({
        jobName: Joi.string().required(),
        jobDescription: Joi.string().required(),
        jobLocation: Joi.string().required(),
        jobDate: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    jobService.create(req.body)
        .then(() => res.json({ message: 'Job creation successful' }))
        .catch(next);
}
