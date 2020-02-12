const EducExpe = require('./../models/educationExperience.model'),
      Boom = require('boom');

/**
* Post one Education/Experience
*/
exports.add = async (req, res, next) =>{
    try{
        let dataUserId = req.body;
        dataUserId.userId = req.user._id;
        const educExpe = new EducExpe(dataUserId);
        await educExpe.save();
        return res.json(educExpe.transformEducExpe());
    }catch(error){
        next(Boom.badImplementation(error.message));
    }
};

/**
* GET all Education/Experience by user id
*/
exports.findAllQuery = async (req, res, next) =>{
    try {
        const educExpe = await EducExpe.find()
        .sort({dateStart: -1});
        const fields = ['_id', 'dateStart', 'dateEnd', 'titleEducExpe', 'placeEducExpe', 'educExpe'];
        let arrayEducExpeTransformed = [];
        educExpe.forEach((item)=>{
            const object = {};
            fields.forEach((field)=>{
                object[field] = item[field];
            });
            arrayEducExpeTransformed.push(object);
        });
        return res.json(arrayEducExpeTransformed);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* GET one Education/Experience
*/
exports.findOne = async (req, res, next) =>{
    try {
        const educExpe = await EducExpe.findById(req.params.educExpeId);
        return res.json(educExpe.transformEducExpe());
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* PATCH Education/Experience
*/
exports.update = async (req, res, next) => {
    try {
        const educExpe = await EducExpe.findByIdAndUpdate(req.params.educExpeId,  req.body, {new : true});
        return res.json(educExpe.transformEducExpe());
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* DELETE Education/Experience
*/
exports.remove = async (req, res, next) => {
    try {
        const educExpe = await EducExpe.findByIdAndDelete(req.params.educExpeId);
        return res.json(educExpe.transformEducExpe());
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};