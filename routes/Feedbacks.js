var FeedBack = require('../models').feedbacks;

module.exports = app => {
    var feedbacks = require('../controller/Feedbacks');
    var router = require('express').Router();

    router.post("/create", feedbacks.create);
    // router.get('/', FormCV.findall);
    router.get('/getAll', feedbacks.findAll);

    // router.delete('/:id', FormCV.delete);
    // router.patch('/:id', FormCV.update);

    app.use("/feedbacks", router);
}