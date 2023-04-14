var FeedBack = require('../models').feedbacks;
require('dotenv').config()
exports.findAll = (req, res) => {
    console.log('================================')
    let listFollowUser = []
    FeedBack.find({}).then(data => {
        console.log(data)
        // listFollowUser.push(data.dataValues.user_id_follows)
        res.json({ code: 1, data })
    }).catch(er => {
        throw er;
    })
}
exports.create = (req, res) => {
    console.log('create', req.body)
    FeedBack.create(req.body).then(data => {
        res.status(200).json({
            code: 1,
            data
        })
    });
}