const express = require('express');
const router = express.Router();
const models = require('../models')
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
    Page.findAll()
        .then((pages) => {
            res.render('index', { pages });
        })
})

router.post('/', (req, res, next) => {

    const tagsArr = req.body.tags.split(/\s*\,\s+|\,\s+|\s*\,|\s+|\,/g)

    User.findOrCreate({
        where: {
            name: req.body.authorname,
            email: req.body.authoremail
        }
    })
        .then(foundAuthor => {
            const author = foundAuthor[0];
            console.log(req.body)
            const page = Page.build({
                title: req.body.title,
                content: req.body.content,
                tags: tagsArr
            })

            return page.save()
                .then(function () {
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
        },
        include: [
            { model: User, as: 'author' }
        ]
    })
        .then(function (page) {
            if (page === null) {
                res.sendStatus(404);
            } else {
                const user = page.author
                console.log(page)
                res.render('wikipage', { page, user });
            }
        })
        .catch(next);

})