const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    res.send('get method worked');
})

router.post('/', (req, res, next) => {
    res.send('post method worked');
})

router.get('/add', (req, res, next) => {
    res.send('get method worked on add');
})