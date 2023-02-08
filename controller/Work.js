var Work = require('../models').Work;
var Company = require('../models').Company;
var TagWork = require('../models').TagWork;
var WorkTypeOfWork = require('../models').WorkTypeOfWork;
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  Work.create(req.body, { include: ['tagWork', 'workType'] })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  var page = req.query.page;
  var status = req.query.status;
  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page || status) {
    if (page && !status) {
      Work.findAndCountAll({
        order: [['id', 'DESC']],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
        include: [Company],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      Work.findAndCountAll({
        where: { status: status },
        order: [['id', 'DESC']],
        include: [Company],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      Work.findAndCountAll({
        where: { status: status },
        order: [['id', 'DESC']],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
        include: [Company],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    Work.findAndCountAll({ order: [['id', 'DESC']], include: [Company] })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.search = (req, res) => {
  var address = req.query.address || '';
  var status = req.query.status || '';
  var name = req.query.name || '';
  var nature = req.query.nature === '0' ? '' : req.query.nature;
  Work.findAndCountAll({
    where: {
      nature: { [Op.like]: `%${nature}%` },
      address: { [Op.like]: `%${address}%` },
      name: { [Op.like]: `%${name}%` },
      status: status,
    },
    order: [['id', 'DESC']],
    attributes: [
      'id',
      'name',
      'address',
      'createdAt',
      'price1',
      'price2',
      'dealtime',
    ],
    include: [{ model: Company, attributes: ['name', 'id', 'avatar'] }],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findAllId = (req, res) => {
  var page = req.query.page;
  var companyId = req.query.id;

  if (page) {
    page = parseInt(page);
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    Work.findAndCountAll({
      offset: soLuongBoQua,
      limit: PAGE_SIZE,
      include: [Company],
      where: { companyId: companyId, status: 1 },
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    Work.findAndCountAll({
      include: [Company],
      where: { companyId: companyId, status: 1 },
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findone = (req, res) => {
  Work.findOne({ where: { id: req.params.id }, include: [Company] })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Work.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Work.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
