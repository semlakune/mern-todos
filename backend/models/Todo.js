const {getDb} = require("../config/db");
const {ObjectId} = require("mongodb");

class Todo {
    static todo() {
        return getDb().collection("todos");
    }

    static create(payload) {
        return this.todo().insertOne({
            ...payload,
            status: "uncompleted",
        });
    }

    static findAll(id) {
        return this.todo().find({userId: ObjectId(id)}).toArray();
    }

    static findById(id) {
        return this.todo().findOne({_id: ObjectId(id)});
    }

    static findByCategory(categoryId) {
        return this.todo().find({categoryId}).toArray();
    }

    static findByTask(task) {
        return this.todo().findOne({task: task});
    }

    static update(payload) {
        return this.todo().updateOne({_id: ObjectId(payload.id)}, {$set: {status: payload.status}});
    }

    static delete(id) {
        return this.todo().deleteOne({_id: ObjectId(id)});
    }

}

module.exports = Todo;