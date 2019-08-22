var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false},
    email:String,
    dob:  { type: Date, default: null },
    address : { type:String, default:null },
    phoneNo : {type : String, default: null}
});

UserSchema.index({ username: 1 }, { unique: true });


UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err)
            return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);
