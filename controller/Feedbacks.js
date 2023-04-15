var FeedBack = require('../models').feedbacks;
require('dotenv').config()
exports.findAll = async (req, res) => {
    const data = await FeedBack.findAll();
    console.log("data", data);
    if (data) {
        res.status(200).json({
            code : 1,
            data: data
        })
    }
}
exports.create = (req, res) => {
    FeedBack.create(req.body).then(data => {
        res.status(200).json({
            code: 1,
            data
        })
    });
}