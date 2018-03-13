const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const searchRouter = require('./search');
const models = require('../models')
const Page = models.Page;
const User = models.User;

router.get('/', (req, res, next) => {
        res.render('homepage')
})

router.get('/about', (req, res, next) => {
        res.render('about')
})

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);
router.use('/', searchRouter);


module.exports = router;