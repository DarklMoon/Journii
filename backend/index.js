const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
const { logger } = require('./middlewares')
app.use(logger)
app.use(cors())
// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require("./routes/index")
const memoRouter = require("./routes/memo")
const reportRouter = require("./routes/report")
const userRouter = require("./routes/user")
const adminRouter = require("./routes/admin")


app.use(indexRouter.router)
app.use(memoRouter.router)
app.use(reportRouter.router)
app.use(userRouter.router)
app.use(adminRouter.router)

app.listen(3000, () => {
  console.log(`Backend listening at http://localhost:3000`)
});