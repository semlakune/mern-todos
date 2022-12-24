function errorHandler(err, req, res, next) {

    let code = 500;
    let message = "Internal Server Error";

    if (err.name === "NotFound") {
        code = 404;
        message = "Data not Found";
    } else if (err.name === "AlreadyCreated") {
        code = 400;
        message = "Task already created";
    } else if (err.name  === "CategoryAlreadyCreated") {
        code = 400;
        message = "Category already created";
    } else if (err.name === "UserAlreadyCreated") {
        code = 400;
        message = "Email already registered";
    } else if (err.name === "Unauthorized" || err.message === "jwt must be provided") {
        code = 401;
        message = "Unauthorized";
    } else if (err.name === "InvalidEmailPassword") {
        code = 401;
        message = "Invalid email/password";
    } else if (err.name === "Forbidden") {
        code = 403;
        message = "Forbidden";
    }

    res.status(code).json({ message });
}

module.exports = errorHandler;