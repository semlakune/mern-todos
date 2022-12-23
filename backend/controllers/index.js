const Todo = require("../models/Todo");
const Category = require("../models/Category");
const User = require("../models/User");
const {compareSync} = require("bcryptjs");
const {sign} = require("jsonwebtoken");

class Controllers {

    // USERS
    static register(req, res, next) {
        const { email, password } = req.body;
        User.findByEmail(email)
            .then((user) => {
                if (user) {
                    throw { name: "UserAlreadyCreated" };
                } else {
                    return User.create({ email, password });
                }
            })
            .then((user) => {
                res.status(201).json({ message: "User created!" });
            })
            .catch((err) => {
                next(err);
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findByEmail(email)
            .then((user) => {
                if (!user) {
                    throw { name: "InvalidEmailPassword" };
                } else {
                    const isValid = compareSync(password, user.password);
                    if (isValid) {
                        const access_token = sign({ id: user._id }, process.env.JWT_SECRET);
                        res.status(200).json({ access_token });
                    } else {
                        throw { name: "InvalidEmailPassword" };
                    }
                }
            })
            .catch((err) => {
                next(err);
            })
    }

    // TODOS
    static createTodo(req, res, next) {
        const { task, categoryId } = req.body;
        Todo.findByTask(task)
            .then((todo) => {
                if (todo) {
                    throw { name: "AlreadyCreated" };
                } else {
                    return Todo.create({ task, categoryId, userId: req.user.id });
                }

            })
            .then((todo) => {
                res.status(201).json({ message: "Todo created!" });
            })
            .catch((err) => {
                next(err);
            })
    }

    static getTodos(req, res, next) {
        console.log(req.user.id);
        Todo.findAll(req.user.id)
            .then((todos) => {
                res.status(200).json(todos);
            })
            .catch(err => {
                next(err);
            })
    }

    static getTodoById(req, res, next) {
        const { todoId } = req.params;
        Todo.findById(todoId)
            .then((todo) => {
                if (!todo) {
                    throw { name: "NotFound" };
                }
                res.status(200).json(todo);
            })
            .catch(err => {
                next(err)
            })
    }

    static getTodoByCategory(req, res, next) {
        const { categoryId } = req.params;
        Todo.findByCategory(categoryId)
            .then((todos) => {
                res.status(200).json(todos);
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTodo (req, res, next) {
        const { todoId } = req.params;
        const { status } = req.body;
        Todo.findById(todoId)
            .then((todo) => {
                if (!todo) {
                    throw { name: "NotFound" };
                }
                return Todo.update({ id: todo._id, status });
            })
            .then((_) => {
                res.status(200).json({ message: "Todo updated!" });
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTodo (req, res, next) {
        const { todoId } = req.params;
        Todo.findById(todoId)
            .then((todo) => {
                if (!todo) {
                    throw { name: "NotFound" };
                }
                return Todo.delete(todo._id);
            })
            .then((_) => {
                res.status(200).json({ message: "Todo deleted!" });
            })
            .catch(err => {
                next(err)
            })
    }

    // CATEGORIES
    static createCategory(req, res, next) {
        const { name } = req.body;
        Category.findByName(name)
            .then((category) => {
                if (category) {
                    throw { name: "CategoryAlreadyCreated" };
                } else {
                    return Category.create({ name, userId: req.user.id });
                }
            })
            .then((category) => {
                res.status(201).json({ message: "Category created!" });
            })
            .catch((err) => {
                next(err);
            })
    }

    static getCategories(req, res, next) {
        Category.findAll(req.user.id)
            .then((categories) => {
                res.status(200).json(categories);
            })
            .catch(err => {
                next(err);
            })
    }

    static getCategoryById(req, res, next) {
        const { categoryId } = req.params;
        Category.findById(categoryId)
            .then((category) => {
                if (!category) {
                    throw { name: "NotFound" };
                }
                res.status(200).json(category);
            })
            .catch(err => {
                next(err)
            })
    }

    static updateCategory (req, res, next) {
        const { categoryId } = req.params;
        const { name } = req.body;
        Category.update({ categoryId, name })
            .then((_) => {
                res.status(200).json({ message: "Category updated!" });
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCategory (req, res, next) {
        const { categoryId } = req.params;
        Category.delete(categoryId)
            .then((_) => {
                res.status(200).json({ message: "Category deleted!" });
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = Controllers;