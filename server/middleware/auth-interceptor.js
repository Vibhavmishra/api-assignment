var jwt = require('jsonwebtoken');
const config = require('../../config');
var User = require('../models/user.model');

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
                        }
                    });
                    User.findOne({token: token}).select('username token').exec(function (err, user)
                    {
                        if (err){
                            throw err;
                            res.status(500).json({
                                message: 'Please try after sometime'
                            });
                        }
                        if (!user)
                        {
                              return res.status(401).json({message: "Not authenticate.", status: false});
                        } else {
                               next();
                            }
                            
                        });
                    

                } else {
                    return res.status(400).send({
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

