const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
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


app.use(indexRouter.router)
app.use(memoRouter.router)
app.use(reportRouter.router)
app.use(userRouter.router)

app.listen(3000, () => {
  console.log(`Backend listening at http://localhost:3000`)
});