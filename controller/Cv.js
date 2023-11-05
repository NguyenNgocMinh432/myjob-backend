var CV = require('../models').cvs;
require('dotenv').config()
exports.findAllCV = async(req,res) => {
    const resCV = await CV.findAll({included: {model:""}});
    return res.status(200).json({
        code: 1,
        data: resCV,
        message: "Lấy thành công"
    })
}
exports.delete = (req,res) => {
    console.log("xóa", req.body.email)
    if (req.body.email) {
        CV.destroy({ where: { email: req.body.email } }).then(() => {
            res.status(200).json({
                code: 1,
                msg: "Xóa thành công cv"
            })
        });
    }
}