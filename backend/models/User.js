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
            token: payload.token,
            verified: payload.verified
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

    static findByToken(token) {
        return this.user().findOne({token: token});
    }

    static update(payload) {
        return this.user().updateOne({_id: ObjectId(payload.id)}, {
            $set: {
                verified: payload.verified
            }
        });
    }

}

module.exports = User;