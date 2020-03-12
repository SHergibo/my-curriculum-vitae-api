const Project = require('./../models/project.model'),
      Boom = require('boom');

/**
* Post project
*/
exports.add = async (req, res, next) =>{
    try{
        let dataUserId = req.body;
        dataUserId.userId = req.user._id;
        const project = new Project(dataUserId);
        await project.save();
        return res.json(project.transformProject());
    }catch(error){
        next(Boom.badImplementation(error.message));
    }
};

/**
* GET project
*/
exports.find = async (req, res, next) =>{
    try {
        const project = await Project.findOne();
        if(project){
            return res.json(project.transformProject());
        }else{
            return res.json(project);
        }
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* PATCH project
*/
exports.update = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.projectId,  req.body, {new : true});
        return res.json(project.transformProject());
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};

/**
* DELETE project
*/
exports.remove = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.projectId);
        return res.json(project);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};