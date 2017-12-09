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

// PUT /api/campuses/campusId
router.put('/:campusId', (req, res, next) => {
    const campusId = req.params.campusId;

    Campus.findById(campusId)
    .then(campus => {
        return campus.update(req.body);
    })
    .then(newCampus => res.json(newCampus))
    .catch(next);
});

// DELETE /api/campuses/campusId
router.delete('/:campusId', (req, res, next) => {
    const id = req.params.campusId;

    Campus.destroy({
        where: {id}
    })
    .then(() => res.status(204).end())
    .catch(next);
});