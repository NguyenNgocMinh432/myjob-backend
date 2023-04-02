var work = require('../models').works;
var Company = require('../models').companies;
var TagWork = require('../models').tagworks;
var WorkTypeOfWork = require('../models').worktypeofworks;
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  	work.create(req.body, { include: ['tagWork', 'workType'] })
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
			work.findAndCountAll({
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
			work.findAndCountAll({
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
			work.findAndCountAll({
				where: { status: status },
				order: [['id', 'DESC']],
				offset: soLuongBoQua,
				limit: PAGE_SIZE,
				include: Company,
			})
			.then((data) => {
			res.json({ data: data });
			})
			.catch((er) => {
			throw er;
		});
    }
	} else {
		work.findAndCountAll({ order: [['id', 'DESC']], include: [Company] }) 
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
  work.findAndCountAll({
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
    work.findAndCountAll({
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
    work.findAndCountAll({
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
  work.findOne({ where: { id: req.params.id }, include: [Company] })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  work.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  work.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
