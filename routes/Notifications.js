module.exports = app => {
    var router = require('express').Router();
    const notificationController = require('../controller/Notifications');

    router.get('/', notificationController.notifications);
    router.patch('/:id', notificationController.updateNotification);
    app.use("/notifications", router);
}