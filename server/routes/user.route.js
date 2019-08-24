var signup_controller = require('../controllers/user.controller');

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'accept');
        next();
    })

    app.post('/api/signup', signup_controller.add);
    app.post('/api/signin', signup_controller.getuser);
    app.post('/api/user/update', signup_controller.updateUser);
    app.get('/api/user/signout', signup_controller.logout);
}