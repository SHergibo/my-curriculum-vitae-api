const Educ = require('./../models/education.model'),
      Boom = require('boom');

/**
* Post one Education
*/
exports.add = async (req, res, next) =>{
    try{
        console.log(req.body);
        const educ = new Educ(req.body);
        await educ.save();
        return res.json(educ);
    }catch(error){
        next(Boom.badImplementation(error.message));
    }
};

/**
* GET all Education by user id
*/
exports.findAllQuery = async (req, res, next) =>{
    try {
        const educ = await Educ.find({
            userId : req.query.userId,
        });
        return res.json(educ);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* GET one education
*/
exports.findOne = async (req, res, next) =>{
    try {
        const educ = await Educ.findById(req.params.educId);
        return res.json(educ);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* PATCH education
*/
exports.update = async (req, res, next) => {
    try {
        const educ = await Educ.findByIdAndUpdate(req.params.educId,  req.body, {new : true});
        return res.json(educ);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* DELETE education
*/
exports.remove = async (req, res, next) => {
    try {
        const educ = await Educ.findByIdAndDelete(req.params.educId);
        return res.json(educ);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};