'use strict'

const router = require('express').Router();
const { Campus } = require('../db/models');

module.exports = router;

// GET /api/campuses
router.get('/', (req, res, next) => {
    Campus.findAll()
    .then(campuses => {
        res.json(campuses);
    })
    .catch(next);
});

// GET /api/campuses/campusId
router.get('/:campusId', (req, res, next) => {
    const campusId = req.params.campusId;
    Campus.findById(campusId)
    .then(campus => {
        res.json(campus);
    })
    .catch(next);
});

// POST /api/campuses
router.post('/', (req, res, next) => {
    Campus.create(req.body)
    .then(newCampus => {
        res.json(newCampus);
    })
    .catch(next);
});

// PUT /api/campuses/campuseId
router.put('/:campuseId', (req, res, next) => {
    const campuseId = req.params.campuseId;

    Campus.findById(campuseId)
    .then(campus => {
        campus.update(req.body);
    })
    .catch(next);
});

// DELETE /api/campuses/campuseId
router.delete('/:campuseId', (req, res, next) => {
    const id = req.params.campuseId;

    Campus.destroy({
        where: {id}
    })
    .then(() => res.status(204).end())
    .catch(next);
});