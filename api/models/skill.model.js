const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

const SkillCategory = ['generalSkill', 'codingSkill', 'language'];

let schema = new Schema({
    nameSkill : {
        type : String,
        required : true,
        trim : true
    },
    percentage : {
        type : Number,
        required : true,
        trim : true
    },
    skillCategory : {
        type : String,
        enum : SkillCategory,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
});

module.exports = Mongoose.model('Skill', schema);