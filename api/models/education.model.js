const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let schema = new Schema({
    yearBegin : {
        type : Number,
        required : true,
        trim : true
    },
    yearEnd : {
        type : Number,
        required : true,
        trim : true
    },
    titleEducation : {
        type : String,
        required : true,
        trim : true
    },
    schoolName : {
        type : String,
        required : true,
        trim : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
});

module.exports = Mongoose.model('Educ', schema);