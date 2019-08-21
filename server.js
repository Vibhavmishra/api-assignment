const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);

mongoose.connect(config.db, { useNewUrlParser: true });

app.get('/',(req,res)=>{	
	res.json({message:'Hey I am listening'});
});

app.use(morgan('dev'));

app.listen(config.port, function () {
    console.log("Server is running on " + config.port);
})
