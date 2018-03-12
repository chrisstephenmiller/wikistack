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
            let pages = {}
            console.log(foundPages[0].dataValues.title)
            for (title in foundPages) {
                pages[title] = foundPages[title].dataValues.title;
            }
            console.log({pages: foundPages})
            res.render('index', {pages: foundPages});
        })
})

router.post('/', (req, res, next) => {
    const page = Page.build({
        title: req.body.title,
        content: req.body.textarea,
    })

    page.save()
        .then(function (savedPage) {
            res.redirect(savedPage.route)
        }).catch(next)
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
            const locals = foundPage.dataValues;
            res.render('wikipage', locals);
        })
        .catch(next)
})