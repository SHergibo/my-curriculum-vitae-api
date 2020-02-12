const Skill = require('./../models/skill.model'),
      Boom = require('boom');

/**
* Post one Skill
*/
exports.add = async (req, res, next) =>{
    try{
        console.log(req.body);
        let dataUserId = req.body;
        dataUserId.userId = req.user._id;
        const skill = new Skill(dataUserId);
        await skill.save();
        return res.json(skill.transformSkill());
    }catch(error){
        console.log(error);
        next(Boom.badImplementation(error.message));
    }
};

/**
* GET all Skill by user id
*/
exports.findAllQuery = async (req, res, next) =>{
    try {
        const skill = await Skill.find();
        const fields = ['_id', 'nameSkill', 'percentage', 'skillCategory'];
        let arraySkillTransformed = [];
        skill.forEach((item)=>{
            const object = {};
            fields.forEach((field)=>{
                object[field] = item[field];
            });
            arraySkillTransformed.push(object);
        });
        return res.json(arraySkillTransformed);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* GET one Skill
*/
exports.findOne = async (req, res, next) =>{
    try {
        const skill = await Skill.findById(req.params.skillId);
        return res.json(skill.transformSkill());
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* PATCH Skill
*/
exports.update = async (req, res, next) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.skillId,  req.body, {new : true});
        return res.json(skill.transformSkill());
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* DELETE Skill
*/
exports.remove = async (req, res, next) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.skillId);
        return res.json(skill.transformSkill());
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};