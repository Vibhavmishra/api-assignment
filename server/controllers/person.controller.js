var Person = require('../models/person.model');
var jwttoken = require("jsonwebtoken");
var config = require('../../config');
exports.addPerson = function (req, res) {

    console.log('api called');
    var person = new Person();

    person.name = req.body.name;
    person.email = req.body.email;
    person.phoneNo = req.body.phoneNo;
    person.dob = req.body.dob;
    person.address = req.body.address;

    
    person.save(function (err) {
        if (err) {
            console.log(err);
             res.json({message: "Sorry, Please try again.", status: false});
            
        } else {
            
            return res.json(person);
        }

    });
}

exports.getPerson = function (req, res) {

    
    
    Person.find(function (err,persons) {
        if (err) {
            console.log(err);
             res.json({message: "Sorry, Please try again.", status: false});
            
        } else {
            
            return res.json(persons);
        }

    });
}

exports.updatePerson =  function (req, res) {

    let person = req.body;
    const personId = req.body._id;
    const uniqueAttribute = ['_id'];

    uniqueAttribute.forEach(e => delete person[e]);
   
    Person.findOneAndUpdate({_id: personId}, person, {new: true},(err,result)=>{
        if(err){
            res.json({message: "Sorry, Please try again.", status: false});
        }else{
            if(result==null){
                res.json({message: "Sorry, Invalid Data provided.", status: false});
            }else{
                  res.json(result);
            }
        }
    })

}

exports.deletePerson =  function (req, res) {
    var id = req.params.boardId;

    
    Person.deleteOne({ id: id }, function (err) {
      if (err) {
                    res.json({message: "Sorry, Please try again.", status: false});

                }else{
                                res.json({message: "Object deleted successfully", status: true});

                }
      // deleted at most one tank document
    });

}