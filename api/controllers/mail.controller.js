const Mail = require('./../models/mail.model'),
      Boom = require('boom');

/**
* Post one user
*/
exports.send = async (req, res, next) =>{
    console.log(req.body)
    try{
        const user = new User(req.body);
        await user.save();
        await TokenAuth.generate(user);
        return res.json(user.transform());
    }catch(error){
        next(User.checkDuplicateEmail(error));
    }
};