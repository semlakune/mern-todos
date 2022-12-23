const Controllers = require("../controllers");
const routes = require('express').Router();
const auth = require("../middlewares/authc");
const {todoAuthz, categoryAuthz} = require("../middlewares/authz");

// USERS
routes.post("/register", Controllers.register);
routes.post("/login", Controllers.login);

routes.use(auth)

// TODOS
routes.post("/todos", Controllers.createTodo);
routes.get("/todos", Controllers.getTodos);
routes.get("/todos/:todoId", Controllers.getTodoById);
routes.get("/todos/category/:categoryId", Controllers.getTodoByCategory);
routes.patch("/todos/:todoId", todoAuthz, Controllers.updateTodo);
routes.delete("/todos/:todoId", todoAuthz, Controllers.deleteTodo);

// CATEGORIES
routes.post("/categories", Controllers.createCategory);
routes.get("/categories", Controllers.getCategories);
routes.get("/categories/:categoryId", Controllers.getCategoryById);
routes.patch("/categories/:categoryId", categoryAuthz, Controllers.updateCategory);
routes.delete("/categories/:categoryId", categoryAuthz, Controllers.deleteCategory);

module.exports = routes;