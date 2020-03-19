const Project = require('./../models/project.model'),
      Boom = require('boom');

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { mongo } = require('./../../config/environment.config');


const UploadImg = require('./../middlewares/uploadImg.middleware');



/**
* Post project
*/
exports.add = async (req, res, next) =>{
    let test = await UploadImg(req, res);
    console.log(req.body);
    console.log(req.file);

    const conn = mongoose.createConnection(mongo.uri);
    Grid.mongo = mongoose.mongo;
    let gfs;

    conn.once("open", () => {
        console.log("ici");
        gfs = Grid(conn.db);
        gfs.collection('images');


        gfs.files.findOne({ filename: "1584646888193-Hergibo_Sacha.jpg" }, (err, file) => {
            console.log(file);
          });
    });

    // if(mongoose.connection.readyState === 1){
    //     gfs = Grid(mongoose.connection.db, mongoose.mongo);
    //     gfs.collection('uploads');
    // }



    return res.json({status : "200"});
    // try{
    //     let dataUserId = req.body;
    //     dataUserId.userId = req.user._id;
    //     const project = new Project(dataUserId);
    //     await project.save();
    //     return res.json(project.transformProject());
    // }catch(error){
    //     next(Boom.badImplementation(error.message));
    // }
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