const Todo = require("../models/Todo");
const Category = require("../models/Category");

function todoAuthz(req, res, next) {
    const { todoId } = req.params;
    Todo.findById(todoId)
        .then((todo) => {
            if (todo.userId.toString() === req.user.id.toString()) {
                next();
            } else {
                throw { name: "Forbidden" };
            }
        })
        .catch(err => {
            next(err);
        })
}

function categoryAuthz(req, res, next) {
    const { categoryId } = req.params;
    Category.findById(categoryId)
        .then((category) => {
            if (category.userId.toString() === req.user.id.toString()) {
                next();
            } else {
                throw { name: "Forbidden" };
            }
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {
    todoAuthz,
    categoryAuthz
};