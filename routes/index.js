const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki.js');
const userRouter = require('./user');

router.use('/wiki', wikiRouter);
// router.use('/user', userRouter);
// router.get('/wiki', (req, res, next) => {
//     res.send('wiki get worked');
// })

module.exports = router;