var Follows = require('../models').follows;
require('dotenv').config()
exports.findone = (req, res) => {
    let listFollowUser = []
    Follows.findAll({ where: { user_id: 1 } }).then(data => {
        // listFollowUser.push(data.dataValues.user_id_follows)
        res.json({ data })
    }).catch(er => {
        throw er;
    })
}
exports.create = (req, res) => {
    Follows.create(req.body).then(data => {
        res.status(200).json({
            data
        })
    });
}