var follows = require("../models").follows;
const userServices = {
    getUserFollower: async (userId) => {
        const getResponseUserFollow = await follows.findAll({where: {user_id_follows: userId}})
        console.log("getResponseUserFollow", getResponseUserFollow)
        if (getResponseUserFollow) {
            return {
                code: 1,
                msg: "Lấy data follow thành công !!",
                data: getResponseUserFollow
            }
        } else {
            return {
                code: 0,
                msg: "Lấy data follow không thành công"
            }
        }
    }
}
module.exports = userServices;