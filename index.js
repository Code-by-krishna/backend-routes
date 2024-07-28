const express = require("express");
const router = require("./Router/user.router");
const { json } = require("body-parser");

//Create an object of express.
const app = express();

//Simple middleware.
app.use(json());



//middlewares of apis.
app.use("/post",router);
app.use("/get",router);
app.use("/get",router);
app.use("/update",router);
app.use("/update",router);
app.use("/delete",router);



app.listen(3000,() => console.log("Server is runing!!"));