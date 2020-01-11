const Expe = require('./../models/experience.model'),
      Boom = require('boom');

/**
* Post one experience
*/
exports.add = async (req, res, next) =>{
    try{
        console.log(req.body);
        const expe = new Expe(req.body);
        await expe.save();
        return res.json(expe);
    }catch(error){
        next(Boom.badImplementation(error.message));
    }
};

/**
* GET all experience by user id
*/
exports.findAllQuery = async (req, res, next) =>{
    try {
        const expe = await Expe.find({
            userId : req.query.userId,
        });
        return res.json(expe);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* GET one experience
*/
exports.findOne = async (req, res, next) =>{
    try {
        const expe = await Expe.findById(req.params.expeId);
        return res.json(expe);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* PATCH experience
*/
exports.update = async (req, res, next) => {
    try {
        const expe = await Expe.findByIdAndUpdate(req.params.expeId,  req.body, {new : true});
        return res.json(expe);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* DELETE experience
*/
exports.remove = async (req, res, next) => {
    try {
        const expe = await Expe.findByIdAndDelete(req.params.expeId);
        return res.json(expe);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};