var TypeOfWork = require('../models').typeofworks;
var work = require('../models').works;
const WorkTypeOfWork =  require('../models').worktypeofworks;
const Company = require('../models').companies;
const { Op } = require('sequelize');
require('dotenv').config()
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    TypeOfWork.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    var page = req.query.page;
    var status = req.query.status;
    page = parseInt(page)
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    if (page || status) {
        if (page && !status) {
            TypeOfWork.findAndCountAll({ order: [["id", "DESC"]], offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else if (status && !page) {
            TypeOfWork.findAndCountAll({ where: { status: status }, order: [["id", "DESC"]], include: [{ model: work, attributes: ["id"] }] })
            .then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else {
            TypeOfWork.findAndCountAll({ where: { status: status }, order: [["id", "DESC"]], offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        }
    } else {
        TypeOfWork.findAndCountAll({ order: [["id", "DESC"]], include: [{ model: work, attributes: ["id"] }] }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.findCategori = (req, res) => {
    TypeOfWork.findAll({ order: [["id", "DESC"]], include: [{ model: work, attributes: ['id'] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    
    TypeOfWork.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.getworks = (req, res) => {
    WorkTypeOfWork.findAll({ where: { typeofworkId: req.params.id }, include:[{model: work, attributes: ['id','companyId',"name","address","email","addressGoogle","phone","price","request","dealtime","price2"]}] }).then(data => {
        // res.json({ data: data })
        let arrWork = [];
        let arrRes = [];
        data && data.forEach((item,index) => {
            const dataWork = item.dataValues.work
            arrWork.push(dataWork.dataValues.companyId);
        })
        Company.findAll({ where: {id: { [Op.in]: arrWork }}}).then(dataCompany => {
            data && data.forEach((item,index) => {
                const getDataWork = item.dataValues.work.dataValues
                dataCompany.forEach((item,index) => {
                    getDataWork.company = item.dataValues;
                })
                arrRes.push(getDataWork);

            })
            console.log("arrRes", arrRes);
            return res.status(200).json({
                code: 1,
                msg: "success",
                data: arrRes
            })
        })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    TypeOfWork.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    TypeOfWork.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}