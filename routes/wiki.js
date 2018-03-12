const express = require('express');
const router = express.Router();
const models = require('../models')
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
    Page.findAll({

    })
        .then((foundPages) => {
            res.render('index', { pages: foundPages });
        })
})

router.post('/', (req, res, next) => {

    User.findOrCreate({
        where: {
            name: req.body.authorname,
            email: req.body.authoremail
        }
    })
        .then(foundAuthor => {
            const author = foundAuthor[0];

            const page = Page.build({
                title: req.body.title,
                content: req.body.textarea,
            })

            return page.save()
                .then(function (savedPage) {
                    return page.setAuthor(author);
                })
        })
        .then(function (page) {
            res.redirect(page.route)
        })

})

router.get('/add', (req, res, next) => {
    res.render('addpage');
})

router.get('/:urlTitle', (req, res, next) => {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
        .then((foundPage) => {
            res.render('wikipage', { pages: foundPage });
        })
        .catch(next)
})