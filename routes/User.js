module.exports = app => {
    var User = require('../controller/User');
    var router = require('express').Router();

    router.post("/", User.create);
    router.get('/', User.findall);
    router.get('/:id', User.findone);
    router.get("/allCv" ,function(req,res) {
    });
    // Lấy thông tin của user
    // router.get('/notifications', User.notifications);
    // router.get('/notifications', (req,res) => {
    //     console.log(req);
    //     console.log(2222222222);
    // });

    router.post('/getcvuser', User.findCVUser);
    router.delete('/:id', User.delete);
    router.patch('/:id', User.update);
    router.post('/device', User.updateDevice);
    router.post('/share', User.sharePost);
    router.post('/createcv', User.createcv);
    router.post('/sendMail', User.sendMail);

    app.use("/users", router);
}