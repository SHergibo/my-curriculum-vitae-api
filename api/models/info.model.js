const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let schema = new Schema({
    phone : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    address : {
        street : {
            type : String,
            required : true,
            trim : true
        },
        number : {
            type : String,
            required : true,
            trim : true
        },
        zip : {
            type : String,
            required : true,
            trim : true
        },
        city : {
            type : String,
            required : true,
            trim : true
        }
    },
    birthdate : {
        type : Date,
        required : true,
        trim : true
    },
    licence : {
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

module.exports = Mongoose.model('Info', schema);