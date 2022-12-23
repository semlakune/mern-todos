const { verify } = require('jsonwebtoken');
const User = require("../models/User");

function auth (req, res, next) {
    const { access_token } = req.headers;
    const decoded = verify(access_token, process.env.JWT_SECRET);
    User.findById(decoded.id)
        .then((data) => {
            if (!data) throw { name: "Unauthorized" };
            req.user = { id: data._id };
            next()
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = auth;