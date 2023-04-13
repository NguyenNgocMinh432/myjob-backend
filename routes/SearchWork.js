module.exports = app => {
    var Work = require('../controller/Work');
    var router = require('express').Router();

    router.get('/', Work.search);
    router.get('/suggest', Work.suggest);

    app.use("/searchWorks", router);
}