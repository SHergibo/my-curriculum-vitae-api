const Info = require('./../models/info.model'),
      Boom = require('boom');

/**
* Post info
*/
exports.add = async (req, res, next) =>{
    try{
        console.log(req.body);
        const info = new Info(req.body);
        await info.save();
        return res.json(info);
    }catch(error){
        next(Boom.badImplementation(error.message));
    }
};

/**
* GET info
*/
exports.findOne = async (req, res, next) =>{
    try {
        const info = await Info.findById(req.params.infoId);
        return res.json(info);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* PATCH info
*/
exports.update = async (req, res, next) => {
    try {
        const info = await Info.findByIdAndUpdate(req.params.infoId,  req.body, {new : true});
        return res.json(info);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};