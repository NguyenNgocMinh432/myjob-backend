module.exports = app => {
    var cv = require('../controller/Cv');
    var router = require('express').Router();

    router.get("/allCv", cv.findAllCV);
    router.post("/deleteCv", cv.delete);

    app.use("/admin/", router);
}