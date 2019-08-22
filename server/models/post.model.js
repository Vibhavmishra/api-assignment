var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    status:  {type: String, default: null },
    created:  {type: Date, default: null },
    userId : { type: Schema.Types.ObjectId, ref: 'User' }
});

PostSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: false // set true for one-to-one relationship
})


module.exports = mongoose.model('Post', PostSchema);