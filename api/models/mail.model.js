const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let schema = new Schema({
    firstname : {
        type : String,
        required : true,
        trim : true
    },
    lastname : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    phone : {
        type : String,
        required : true,
        trim : true
    },
    subject : {
        type : String,
        required : true,
        trim : true
    },
    message : {
        type : String,
        required : true,
        trim : true
    },
});

module.exports = Mongoose.model('Mail', schema);