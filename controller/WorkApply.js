var WorkApply = require('../models').workapplies;
var Company = require('../models').companies;
var work = require('../models').works;
var User = require('../models').users;

exports.create = (req, res) => {
	WorkApply.bulkCreate(req.body)
		.then((data) => {
			res.json({ data: data });
		})
		.catch((er) => {
			throw er;
		});
};
exports.findall = (req, res) => {
  WorkApply.findAll()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findone = (req, res) => {
  WorkApply.findOne({ where: { id: req.params.id } })
    .then((data) => {
      	res.json({ data: data });
    })
    .catch((er) => {
     	throw er;
    });
};
exports.delete = (req, res) => {
  WorkApply.destroy({ where: { userId: req.params.id } })
    .then((data) => {
      	res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  WorkApply.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.checkWorkApply = (req, res) => {
	Company.findOne({
		where: { id: req.params.id },
		attributes: ['name', 'avatar'],
		include: [
			{
				model: work,
				attributes: ['id', 'name'],
				include: [
					{
						model: User,
						as: 'workapply2',
						attributes: [
							'id',
							'avatar',
							'name',
							'address',
							'phone',
							'male',
							'email',
						],
						through: { attributes: ['link', 'message'] },
					},
				],
			},
		],
	})
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.checkUserApply = (req, res) => {
	User.findOne({
		where: { id: req.params.id },
		attributes: ['id'],
		include: [
		{
			model: work,
			as: 'workapply',
			attributes: ['id', 'name', 'price1', 'price2', 'address', 'dealtime'],
			include: [{ model: Company, attributes: ['name', 'avatar'] }],
		},
		],
	})
    .then((data) => {
      	res.json({ data: data });
    })
    .catch((er) => {
      	throw er;
    });
};
