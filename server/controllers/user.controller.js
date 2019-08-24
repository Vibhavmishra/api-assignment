var User = require('../models/user.model');
var jwttoken = require("jsonwebtoken");
var config = require('../../config');
exports.add = function (req, res) {

    console.log('api called');
    var user = new User();

    user.name = req.body.name;
    user.password = req.body.password;
    user.username = req.body.username;
    user.email = req.body.email;
    user.phoneNo = req.body.phoneNo;
    user.token = jwttoken.sign({name: user.name, username: user.username}, config.secret, {expiresIn: 1*60*60*24});

    user.save(function (err) {
        if (err) {
            if (err.code == 11000) {
                return res.json({message: "User already exists."});
            } else {
                console.log(err);
                return res.send(err);
            }
        } else {
           
            return res.json({ user: user, status: 200});
        }
    });
}

exports.getuser = function (req, res) {
    User.findOne({username: req.body.username}).select('password username name email dob token').exec(function (err, user)
    {
        if (err){
            throw err;
        }
        if (!user)
        {
              return res.json({message: "User does not exist.", status: false});
        } else if(user)
        {
            var val_password = user.comparePassword(req.body.password);
            if (!val_password)
            {
                res.json({message: "Password does not matchs.", status: false});
            } else {
                jwttoken.verify(user.token, config.secret, function (err, decoded) {
                        if (err) {
                            var token = jwttoken.sign({
                            name: user.name,
                            username: user.username
                                }, config.secret, {expiresIn: 1*60*60*24});

                                User.findOneAndUpdate({_id: user._id}, {token:token}, {new: true},(err,result)=>{
                                    if(err){
                                        res.json({message: "Sorry, Please try again.", status: false});
                                    }else{
                                        delete result.password;
                                        console.log(result);
                                        res.json(result);
                                    }
                                });
                        } else {
                            console.log('passed successfully');
                            delete user.password;
                            res.json(user);
                        }
                });

            }
        }
    });
}

exports.updateUser =  function (req, res) {


    User.findOne({username: req.body.username}).select('username password token').exec(function (err, user)
    {
        if (err){
            throw err;
        }
        if (!user)
        {
              return res.json({message: "User does not exist.", status: false});
        } else if(user)
        {
            //var val_password = user.comparePassword(req.body.password);
            console.log(user);
            
             let userRequested = req.body;
                const userId = user._id;
                const uniqueAttribute = ['username','password','_id'];
                uniqueAttribute.forEach(e => delete userRequested[e]);
               
                User.findOneAndUpdate({_id: userId}, userRequested, {new: true},(err,user)=>{
                    if(err){
                        res.json({message: "Sorry, Please try again.", status: false});
                    }else{
                        if(user==null){
                            res.json({message: "Sorry, Invalid Data provided.", status: false});
                        }else{7
                              res.json(user);
                        }
                    }
                })
            
        }
    });
}

exports.logout = function(req,res){
    const decodedData = jwttoken.decode(req.headers['x-access-token'],console.secret);
    User.findOne({username: decodedData.username}).select('username token').exec(function (err, user)
    {

        if (err){
            throw err;
        }
        if (!user){
              return res.json({message: "User does not exist.", status: false});
        } else if(user){
            //var val_password = user.comparePassword(req.body.password);
            
                User.findOneAndUpdate({_id: user._id}, {token:''}, {new: true},(err,user)=>{
                    if(err){
                        res.json({message: "Sorry, Please try again.", status: false});
                    }else{
                       res.json({message: "User logout successfully.", status: false});
                    }
                });
        }
            
           
    });

}