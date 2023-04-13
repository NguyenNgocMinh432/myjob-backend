var work = require('../models').works;
var Company = require('../models').companies;
var TagWork = require('../models').tagworks;
var WorkTypeOfWork = require('../models').worktypeofworks;
var User = require('../models').users;

require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  	work.create(req.body, { include: ['tagWork', 'workType'] })
    .then((data) => {
		console.log("thêm công việc", data)
      	res.json({ data: data.dataValues });
    })
    .catch((er) => {
		console.log("lỗi", er)
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
	var userId = req.query.userId || '';
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
	
	// update kết quả lưu vào cho user
	console.log("name - userId",name, userId)
	User.update({ last_search: name }, {
		where: {
			id: Number(userId)
		}
	})
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log("Lỗi",error);
	});
};
// Gợi ý theo lịch sử tìm kiếm
exports.suggest = async (req,res) => {
	var userId = req.query.userId || '';
	console.log("suggest",Number(userId));
	if (userId) {
		const responseUser = await User.findOne({where:{id: Number(userId)}})
		const valueSuggest = responseUser.dataValues.last_search;
		const searchWork = await work.findAndCountAll({where:{
			name: { [Op.like]: `%${valueSuggest}%` },
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
		if (searchWork) {
			res.status(200).json({
				code: 1,
				msg: "Thành công",
				data: searchWork
			})
		}
	} else {
		res.status(200).json({
			code: 0,
			msg: "Gợi ý không thành công"
		})
	}
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
