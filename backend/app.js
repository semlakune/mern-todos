if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3000
const {connect} = require('./config/db')
const errorHandler = require('./middlewares/error')

const routes = require("./routes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use(errorHandler)

connect().then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))