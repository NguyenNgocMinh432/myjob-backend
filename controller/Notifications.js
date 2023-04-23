const Notifications = require("../models").notificationusers;
// Lấy tất cả các notification của user
exports.notifications = async(req, res) => {
    const userIdGet = Number(req.query.user_id);
    const responsGetDataNoti = await Notifications.findAll({where: {userId: userIdGet, status: 0 }});
    if (responsGetDataNoti) {
        res.status(200).json({
            code: 1,
            message: "Lấy thông tin noti thành công",
            data: responsGetDataNoti
        })
    }
}

// đổi trạng thái những noti đã xem

exports.updateNotification = async(req, res) => {
    const id = req.body.id;
    const resUpdate = await Notifications.update({status: 1}, {where: {id: id}});
    if (resUpdate) {
        return res.status(200).json({
            code: 1,
            msg: "Update thành công"
        })
    }
}