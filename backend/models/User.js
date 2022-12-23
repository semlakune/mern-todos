const {getDb} = require("../config/db");
const {hashSync} = require("bcryptjs");
const {ObjectId} = require("mongodb");

class User {
    static user() {
        return getDb().collection("users");
    }

    static create(payload) {
        return this.user().insertOne({
            email: payload.email,
            password: hashSync(payload.password, 10),
        });
    }

    static findByEmail(email) {
        return this.user().findOne({email: email});
    }

    static findById(id) {
        return this.user().findOne({_id: ObjectId(id)}, {
            projection: {password: 0}
        });
    }

}

module.exports = User;