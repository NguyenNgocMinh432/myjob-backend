module.exports = app => {
    var User = require('../controller/User');
    var router = require('express').Router();

    router.post("/", User.create);
    router.get('/', User.findall);
    router.get('/:id', User.findone);
    router.get('/getcvuser', (req,res) => {
        console.log(1111111111)
    });
    router.delete('/:id', User.delete);
    router.patch('/:id', User.update);
    router.patch('/device', User.updateDevice);
    router.post('/share', User.sharePost);
    router.post('/createcv', User.createcv);

    app.use("/users", router);
}