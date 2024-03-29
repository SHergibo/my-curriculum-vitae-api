const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let schema = new Schema({
    dateStart : {
        type : Date,
        required : true,
        trim : true
    },
    dateEnd : {
        type : Date,
        required : true,
        trim : true
    },
    titleEducExpe : {
        type : String,
        required : true,
        trim : true
    },
    placeEducExpe : {
        type : String,
        required : true,
        trim : true
    },
    educExpe : {
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

schema.methods.transformEducExpe = function() {
    const fields = ['_id', 'dateStart', 'dateEnd', 'titleEducExpe', 'placeEducExpe', 'educExpe'];
    const object = {};
    fields.forEach((field)=>{
        object[field] = this[field];
    });
    return object;
};

module.exports = Mongoose.model('EducExpe', schema);