const express = require('express');
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
//db config
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(() => console.log("DB Connected"));
mongoose.connection.on("error", err => {
    console.log('DB Connection error: ${err.message}');
});
//Bring in routes

const postRouts = require('./routes/post');
const authRouts = require('./routes/auth');
const userRouts = require('./routes/user');
//apiDocs
app.get("/", (req, res) => {
    fs.readFile("docs/appDocs.json", (err, data) =>{
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
})
/*const myOwnMiddleware = (req, res, next) => {
    console.log("middleware applied!!");
    next();
}*/

//morgan middleware

app.use(morgan("dev"));
//app.use(myOwnMiddleware);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRouts);
app.use("/", authRouts);
app.use("/", userRouts);
app.use(function(err, req, res, next){
    if(err.name === "UnauthorizedError") {
        res.status(401).json({error: "Unauthorized!"});
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('A Node JS Api listining on port:  ${port}');
});