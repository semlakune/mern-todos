const Todo = require("../models/Todo");
const Category = require("../models/Category");
const User = require("../models/User");
const {compareSync} = require("bcryptjs");
const {sign} = require("jsonwebtoken");
const createToken = require("../helpers/token");
const nodemailer = require("nodemailer");

class Controllers {

    // USERS
    static register(req, res, next) {
        const { email, password } = req.body;
        const initialCategories = ["Work", "Groceries", "Study", "Sports"]
        const sendEmail = (email, token) => {
            let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.MAILER_EMAIL,
                    pass: process.env.MAILER_PASSWORD
                },
            })

            let mailOptions = {
                from: '"Todo App" ' + process.env.MAILER_EMAIL,
                to: email,
                subject: "Please verify your account",
                text: `Click this link to verify your account: http://localhost:3001/verify/${token}`,
                html: `
                <!doctype html>
                <html xmlns="http://www.w3.org/1999/xhtml" lang="">
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <style type="text/css">
                        #outlook a {
                            padding: 0;
                        }
                
                        .ReadMsgBody {
                            width: 100%;
                        }
                
                        .ExternalClass {
                            width: 100%;
                        }
                
                        .ExternalClass * {
                            line-height: 100%;
                        }
                
                        body {
                            margin: 0;
                            padding: 0;
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
                
                        table, td {
                            border-collapse: collapse;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                            -ms-interpolation-mode: bicubic;
                        }
                
                        p {
                            display: block;
                            margin: 13px 0;
                        }
                    </style>
                    <!--[if !mso]><!-->
                    <style type="text/css">
                        @media only screen and (max-width: 480px) {
                            @-ms-viewport {
                                width: 320px;
                            }
                            @viewport {
                                width: 320px;
                            }
                        }
                    </style>
                    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
                    <style type="text/css">
                
                        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                
                    </style>
                    <!--<![endif]-->
                    <style type="text/css">
                        @media only screen and (min-width: 480px) {
                            .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] {
                                width: 100% !important;
                            }
                        }
                    </style>
                </head>
                <body style="background: #F9F9F9;">
                <div style="background-color:#F9F9F9;">
                    <style type="text/css">
                        html, body, * {
                            -webkit-text-size-adjust: none;
                            text-size-adjust: none;
                        }
                
                        a {
                            color: #1EB0F4;
                            text-decoration: none;
                        }
                
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                    <div style="margin:0px auto;max-width:640px;background:transparent;">
                        <table role="presentation" cellpadding="0" cellspacing="0"
                               style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
                            <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;">
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix"
                                         style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                            <tr>
                                                <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                                    <table role="presentation" cellpadding="0" cellspacing="0"
                                                           style="border-collapse:collapse;border-spacing:0px;" align="center"
                                                           border="0">
                                                        <tbody>
                                                        <tr>
                                                            <td style="width:138px;"></a></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden">
                        <div style="margin:0px auto;max-width:640px;background:#ffffff;">
                            <table role="presentation" cellpadding="0" cellspacing="0"
                                   style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
                                <tbody>
                                <tr>
                                    <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px;">
                                        <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix"
                                             style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:0px;" align="left">
                                                        <div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
                
                                                            <h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;text-align:center">
                                                                Hi, Please verify your account</h2>
                
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px;"
                                                        align="center">
                                                        <table role="presentation" cellpadding="0" cellspacing="0"
                                                               style="border-collapse:separate;" align="center" border="0">
                                                            <tbody>
                                                            <tr>
                                                                <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;"
                                                                    align="center" valign="middle" bgcolor="#5865f2"><a
                                                                        href="${process.env.HOST_ADDRESS}/verify/${token}"
                                                                        style="text-decoration:none;line-height:100%;background:#5865f2;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;"
                                                                        target="_blank">
                                                                    Verify Account
                                                                </a></td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:30px 0px;"></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style="margin:0px auto;max-width:640px;background:transparent;">
                        <table role="presentation" cellpadding="0" cellspacing="0"
                               style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
                            <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;">
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix"
                                         style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"></table>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </body>
                </html>
                `
            }

            return transporter.sendMail(mailOptions);
        }

        User.findByEmail(email)
            .then((user) => {
                if (user) {
                    throw { name: "UserAlreadyCreated" };
                } else {
                    return User.create({ email, password, token: createToken(8), verified: false });
                }
            })
            .then((user) => {
                initialCategories.forEach(category => {
                    Category.create({name: category, userId: user.insertedId})
                })
                return User.findById(user.insertedId);
            })
            .then((user) => {
                sendEmail(user.email, user.token)
                res.status(201).json({email: user.email, isVerified: user.verified, token: user.token});
            })
            .catch((err) => {
                next(err);
            })
    }

    static verifyAccount(req, res, next) {
        const { token } = req.params;
        User.findByToken(token)
            .then((user) => {
                if (!user) {
                    throw { name: "NotVerified" };
                }
                return User.update({ id: user._id, verified: true });
            })
            .then((_) => {
                res.status(200).json({ isVerified: true });
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findByEmail(email)
            .then((user) => {
                if (!user) {
                    throw { name: "InvalidEmailPassword" };
                } else if (user.verified === false) {
                    throw { name: "NotVerified" };
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
                    return Category.findById(categoryId)
                }

            })
            .then((category) => {
                return Todo.create({ task, categoryId, categoryName: category.name, userId: req.user.id });
            })
            .then((todo) => {
                res.status(201).json({ message: "Todo created!" });
            })
            .catch((err) => {
                next(err);
            })
    }

    static getTodos(req, res, next) {
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
        Todo.findByCategory(categoryId)
            .then((todos) => {
              todos.forEach((todo) => {
                  Todo.delete(todo._id);
              })
            })
            .catch(err => {
                next(err)
            })

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