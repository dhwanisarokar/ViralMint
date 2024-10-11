const User = require("../models/user.model")

const findUserById = async (id) => {
    return await User.findById({_id: id});
}

const findUserByUsername = async (username) => {
    return await User.findOne({username})
}

module.exports = {
    findUserById,
    findUserByUsername,
}