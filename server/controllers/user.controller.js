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
    
    user.save(function (err) {
        if (err) {
            if (err.code == 11000) {
                return res.json({message: "User already exists."});
            } else {
                console.log(err);
                return res.send(err);
            }
        } else {
            var token = jwttoken.sign({name: user.name, username: user.username}, config.secret, {expires: 1440});
            return res.json({token: token, user: user, status: 200});
        }
    });
}

exports.getuser = function (req, res) {
    User.findOne({username: req.body.username}).select('password username name email dob').exec(function (err, user)
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
                var token = jwttoken.sign({
                name: user.name,
                username: user.username
                }, config.secret, {expiresInMinutes: 1440});
                console.log(user);
                delete user.password;                    
                return res.json({status: 200, user: user, token: token});
            }
        }
    });
}

exports.updateUser =  function (req, res) {

    let user = req.body;
    const userId = req.body._id;
    const uniqueAttribute = ['username','password','_id'];

    uniqueAttribute.forEach(e => delete user[e]);
   
    User.findOneAndUpdate({_id: userId}, user, {new: true},(err,user)=>{
        if(err){
            res.json({message: "Sorry, Please try again.", status: false});
        }else{
            if(user==null){
                res.json({message: "Sorry, Invalid Data provided.", status: false});
            }else{
                  res.json(user);
            }

          
        }
    })

}