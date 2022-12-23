const {getDb} = require("../config/db");
const {ObjectId} = require("mongodb");

class Category {
    static category() {
        return getDb().collection("categories");
    }

    static create(payload) {
        return this.category().insertOne({
            name: payload.name,
            userId: ObjectId(payload.userId)
        });
    }

    static findAll(id) {
        return this.category().find({userId: ObjectId(id)}).toArray();
    }

    static findById(id) {
        return this.category().findOne({_id: ObjectId(id)});
    }

    static findByName(name) {
        return this.category().findOne({name: name})
    }

    static delete(id) {
        return this.category().deleteOne({_id: ObjectId(id)});
    }

    static update(payload) {
        return this.category().updateOne({_id: ObjectId(payload.id)}, {$set: {name: payload.name}});
    }
}

module.exports = Category;