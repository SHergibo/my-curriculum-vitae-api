const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let schema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    img : {
        type : String,
        required : true,
        trim : true
    },
    technoUsed : {
        type : Array,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
});

schema.methods.transformProject = function() {
    const fields = ['_id', 'title', 'description', 'img', 'technoUsed'];
    const object = {};
    fields.forEach((field)=>{
        object[field] = this[field];
    });
    return object;
};

module.exports = Mongoose.model('Project', schema);