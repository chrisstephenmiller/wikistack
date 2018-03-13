const express = require('express');
const router = express.Router();
const models = require('../models')
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => {
            res.render(`userspage`, { users })
        })
})

router.get('/:id', (req, res, next) => {
    const userSearch = User.findById(req.params.id)

    const pageSearch = Page.findAll({
        where: {
            authorId: req.params.id
        }
    })

    Promise.all([userSearch, pageSearch])
        .then(foundUsersPages => {
            users = foundUsersPages[0]
            pages = foundUsersPages[1];
            res.render('userpage', { pages, users })
        })
        .catch(next)
})