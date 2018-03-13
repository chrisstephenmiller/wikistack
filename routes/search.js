const express = require('express');
const router = express.Router();
const models = require('../models')
const Page = models.Page;
const User = models.User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = router;

router.get('/search', (req, res, next) => {
    Page.findAll()
        .then((pages) => {
            res.render('search');
        })
})

router.post('/search', (req, res, next) => {

    const tagsArr = req.body.tags.split(/\s*\,\s+|\,\s+|\s*\,|\s+|\,/g)

    Page.findAll({
        // $overlap matches a set of possibilities
        where: {
            tags: {
                [Op.overlap]: tagsArr
            }
        }
    })
    .then(results => {
        res.render('results', {pages: results, tags: tagsArr.join(`' '`)})
    })

    // User.findOrCreate({
    //     where: {
    //         name: req.body.authorname,
    //         email: req.body.authoremail
    //     }
    // })
    //     .then(foundAuthor => {
    //         const author = foundAuthor[0];
    //         console.log(req.body)
    //         const page = Page.build({
    //             title: req.body.title,
    //             content: req.body.content,
    //             tags: tagsArr
    //         })

    //         return page.save()
    //             .then(function () {
    //                 return page.setAuthor(author);
    //             })
    //     })
    //     .then(function (page) {
    //         res.redirect(page.route)
    //     })

})