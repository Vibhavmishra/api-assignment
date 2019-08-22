var User = require('../models/user.model');
var Post = require('../models/post.model');
var jwttoken = require("jsonwebtoken");
var config = require('../../config');


exports.addPost = function (req, res) {
    var post = new Post();
    post.created = new Date();
    post.status = req.body.status;
    if(post.status!==post.status.toLowerCase()){
    	res.json({message: "Sorry, Status can not have any capital letter.", status: false});
    }else{
    	post.userId = req.body.userId;
	    post.save(function (err) {
	        if (err) {
	            console.log(err);
	             res.json({message: "Sorry, Please try again.", status: false});
	            
	        } else {
	            
	            return res.json(post);
	        }

	    });
    }
    
}

exports.getPost = function (req, res) {

	const query = Post.find().populate('user');
	query.exec((err, posts) => {
        return res.status(200).json(posts)
    });
}

