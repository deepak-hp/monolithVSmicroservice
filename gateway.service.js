const express= require("express");
const morgan = require("morgan");
const proxy = require("express-http-proxy")
const app = express();

app.use(morgan("dev"))
app.use('/stress-test', proxy("http://localhost:3002"))
app.use('/', proxy("http://localhost:3001"))

app.listen(3000, () => console.log("gateway is running on http://localhost:3000"))

