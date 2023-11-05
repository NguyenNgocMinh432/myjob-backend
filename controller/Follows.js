var Follows = require('../models').follows;
require('dotenv').config()
exports.findone = (req, res) => {
    Follows.findAll({ where: { user_id: 1 } }).then(data => {
        // listFollowUser.push(data.dataValues.user_id_follows)
        res.json({ data })
    }).catch(er => {
        throw er;
    })
}
exports.create = (req, res) => {
    // check xem trong db đã có dữ liệu follow này hay chưa thì mới thêm vào
    if(req.body.user_id) {
        Follows.findAll({ where: { user_id_follows: req.body.user_id } }).then(data => {
            // listFollowUser.push(data.dataValues.user_id_follows)
            if (data.length > 0) {
                return res.status(200).json({
                    code: 0,
                    msg: "Bạn đã follow người dùng này."
                })
            } else {
                Follows.create(req.body).then(data => {
                    res.status(200).json({
                        data
                    })
                });
            }
        }).catch(er => {
            throw er;
        })
    }
}
exports.delete = (req,res) => {
    console.log("test",req.body);
    if (req.body.user_id && req.body.user_id_follows) {
        Follows.destroy({ where: { user_id: req.body.user_id, user_id_follows: req.body.user_id_follows } }).then(() => {
            res.status(200).json({
                code: 1,
                msg: "unfollow thành công"
            })
        });
    }
}