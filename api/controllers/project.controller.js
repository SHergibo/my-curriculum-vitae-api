const Project = require('./../models/project.model'),
      Boom = require('boom');

const mongoose = require('mongoose');
const { mongo } = require('./../../config/environment.config');


const UploadImg = require('./../middlewares/uploadImg.middleware');



/**
* Post project
*/
exports.add = async (req, res, next) =>{
    try{
        await UploadImg(req, res);
        let dataUserId = req.body;
        dataUserId.userId = req.user._id;
        dataUserId.img = {
            "filename" : req.file.filename,
            "id" : req.file.id
        };
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
    // try {
    //     const project = await Project.findOne();
    //     if(project){
    //         return res.json(project.transformProject());
    //     }else{
    //         return res.json(project);
    //     }
    // } catch (error) {
    //     next(Boom.badImplementation(error.message));        
    // }
};

/**
* GET project img
*/
exports.findImg = async (req, res, next) =>{
    const conn = mongoose.createConnection(mongo.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let gridFSBucket;
    conn.once("open", () => {
        gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: "images"
        });
        gridFSBucket.openDownloadStreamByName(req.params.imgName).pipe(res);
    });
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
        const projectImg = await Project.findById(req.params.projectId);
        const conn = mongoose.createConnection(mongo.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        let gridFSBucket;
        conn.once("open", () => {
            gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: "images"
            });
            gridFSBucket.delete(projectImg.img.id, (err) => {});
        });
        const project = await Project.findByIdAndDelete(req.params.projectId);
        return res.json(project);
    } catch (error) {
        next(Boom.badImplementation(error.message));        
    }
};