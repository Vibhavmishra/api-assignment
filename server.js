const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config");
const app = express();
var authInterceptor = require('./server/middleware/auth-interceptor')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(config.db, { useNewUrlParser: true });

app.get('/',(req,res)=>{	
	res.json({message:'Hey I am listening'});
});

app.use(morgan('dev'));

app.use('**/user/**', authInterceptor('protected'));
app.use('**/person', authInterceptor('public'));
app.use('**/post', authInterceptor('protected'));

require('./server/routes/user.route')(app, express);
require('./server/routes/person.route')(app, express);
require('./server/routes/post.route')(app, express);


app.listen(config.port, function () {
    console.log("Server is running on " + config.port);
})
