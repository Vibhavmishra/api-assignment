var jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = function (option) {
    switch (option) {
        case 'protected':
            return function (req, res, next) {
                var token = req.body.token || req.query.token || req.headers['x-access-token'];
                if (token) {
                    jwt.verify(token, config.secret, function (err, decoded) {
                        if (err) {
                            return res.json({ success: false, message: 'Failed to authenticate token.' });
                        } else {
                            req.decoded = decoded;
                            next();
                        }
                    });
                } else {
                    return res.status(403).send({
                        success: false,
                        message: 'No token provided.'
                    });
                }
            }
        case 'public':
            return function (req, res, next) {
                next();
            }
        default:
            return function (req, res, next) {
                next();
            }
    }
}