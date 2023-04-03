module.exports = app => {
    var User = require('../controller/User');
    var router = require('express').Router();

    router.post("/", User.create);
    router.get('/', User.findall);
    router.get('/:id', User.findone);
    router.delete('/:id', User.delete);
    router.patch('/:id', User.update);
    router.patch('/device', User.updateDevice);
    router.post('/share', User.sharePost);

    app.use("/users", router);
}