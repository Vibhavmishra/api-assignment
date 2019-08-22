var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name:  {type: String, default: null },
    email: {type: String, default: null },
    dob:  {type: Date, default: null },
    address : { type:String, default:null },
    phoneNo : {type : String, default: null}
});



module.exports = mongoose.model('person', PersonSchema);
