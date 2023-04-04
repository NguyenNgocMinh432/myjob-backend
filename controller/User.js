const admin = require('firebase-admin');
var serviceAccount = require("../config/serviceAccountKey.json");
var User = require('../models').users;
var Company = require('../models').companies;
var Role = require("../models").roles;
var work = require("../models").works;
var TypeOfWork = require("../models").typeofworks;
var Tag = require("../models").tags;
var UserRole =require("../models").userroles;
require('dotenv').config()
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    const mail = req.body.email;
    User.findAll({ where: { email: mail } }).then(data => {
        if (data.length !== 0) {
            res.json({ data: "email đã tồn tại!" })
        } else {
            Company.findAll({ where: { email: mail } }).then(data => {
                if (data.length !== 0) {
                    res.json({ data: "email công ty đã tồn tại!" })
                } else {
                    User.create(req.body,{ include:{model:UserRole, as:"asUserRole"}} ).then(data => {
                        res.json({ data: data })
                    }).catch(er => {
                        throw er;
                    })
                }
            })
        }
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    var page1 = req.query.page;
    var status = req.query.status;
    let page = parseInt(page1)
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    if (page || status) {
        if (page && !status) {
            User.findAndCountAll({ offset: soLuongBoQua, limit: PAGE_SIZE, include: [{ model: TypeOfWork }, { model: Tag },{model:Role}] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else if (status && !page) {

            User.findAndCountAll({ where: { status: status }, include: [{ model: TypeOfWork }, { model: Tag },{model:Role}] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else {

            User.findAndCountAll({ where: { status: status }, offset: soLuongBoQua, limit: PAGE_SIZE, include: [{ model: TypeOfWork }, { model: Tag },{model:Role}] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        }
    } else {

        User.findAndCountAll({ include: [{ model: TypeOfWork }, { model: Tag },{model:Role}] }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.findone = (req, res) => {
    User.findOne({ where: { id: req.params.id }, include: [{ model: TypeOfWork }, { model: Tag }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}

exports.findSaveWork = (req, res) => {
    User.findOne({ where: { id: req.params.id }, include: [{ model: TypeOfWork }, { model: Tag }, { model: work, attributes: ['id', 'name', 'companyId', 'address', 'dealtime', 'price1', 'price2'], include: [{ model: Company, attributes: ['name', 'avatar'] }] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    User.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.updateDevice = (req, res) => {
    const getBodyRequest = req.body;
    const { userId, token } = getBodyRequest;
    if (userId) {
        User.findOne({where: {id: userId}}).then(user => {
            if(user) {
                user.update({device: token}).then(data => {
                    res.status(200).json({
                        code: 1,
                        message: "update devide thành công"
                    })
                }).catch(err => {
                    res.status(200).json({
                        code: 0,
                        message: "update devide không thành công"
                    })
                })
            } else {
    
            }
        }).catch(err => {
            res.status(200).json({
                code: 0,
                message: "Không tìm thấy user"
            })
        })
    }
}

exports.sharePost = async(req, res) => {
    const requestBodyShare = req.body;
    const { userId, title, address } = requestBodyShare;
    // Initialize Firebase Admin SDK
    // try {
    //     admin.initializeApp({
    //         credential: admin.credential.cert(serviceAccount)
    //     });
    // } catch (error) {
    //     admin.app()
    // }
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    
    const getUserId = await User.findOne({where: {id: userId}});

    // Define the message payload
    const message = {
        notification: {
            title: title,
            body: address,
        },
        token: getUserId.dataValues.device,
    };
    console.log(message)
    admin.messaging().send(message)
    .then((response) => {
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
}