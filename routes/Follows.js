module.exports = app => {
    var follows = require('../controller/Follows');
    var router = require('express').Router();

    router.post("/", follows.create);
    // router.get('/', FormCV.findall);
    router.get('/', follows.findone);
    router.post('/delete', follows.delete);
    // router.patch('/:id', FormCV.update);

    app.use("/follows", router);
}