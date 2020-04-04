const Project = require('./../models/project.model'),
      Boom = require('@hapi/boom');

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
        dataUserId.technoUsedFront = JSON.parse(req.body.technoUsedFront);
        dataUserId.technoUsedBack = JSON.parse(req.body.technoUsedBack);
        const project = new Project(dataUserId);
        await project.save();
        return res.json(project.transformProject());
    }catch(error){
        next(Boom.badImplementation(error.message));
    }
};

/**
* GET all project
*/
exports.findAll = async (req, res, next) =>{
    try {
        const project = await Project.find();
        const fields = ['_id', 'projectName', 'description', 'img', 'altImg', 'technoUsedFront', 'technoUsedBack', 'url'];
        let arraySkillTransformed = [];
        project.forEach((item)=>{
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
* GET project img
*/
exports.findImg = async (req, res, next) =>{
    try {
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
    } catch (error) {
        next(Boom.badImplementation(error.message));
    }
};

/**
* PATCH project
*/
exports.update = async (req, res, next) => {
    try {
        await UploadImg(req, res);
        let body = req.body;
        body.technoUsedFront = JSON.parse(req.body.technoUsedFront);
        body.technoUsedBack = JSON.parse(req.body.technoUsedBack);
        const projectImg = await Project.findById(req.params.projectId);
        if(req.file){
            
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
            body.img = {
                "filename" : req.file.filename,
                "id" : req.file.id
            }
        }else{
            body.img = projectImg.img;
        }
        const project = await Project.findByIdAndUpdate(req.params.projectId,  body, {new : true});
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