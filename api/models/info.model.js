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
    description : {
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

schema.methods.transformInfo = function() {
    const fields = ['_id', 'firstname', 'lastname', 'phone', 'email', 'address', 'birthdate', "licence", "description"];
    const object = {};
    fields.forEach((field)=>{
        object[field] = this[field];
    });
    return object;
};

module.exports = Mongoose.model('Info', schema);