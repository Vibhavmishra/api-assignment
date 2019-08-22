var post_controller = require('../controllers/post.controller');

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'accept');
        next();
    })

    app.get('/api/post', post_controller.getPost);
    app.post('/api/post', post_controller.addPost);
}