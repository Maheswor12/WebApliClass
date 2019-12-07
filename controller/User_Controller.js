var user = require('../model/UserModel.js');
var bcrypt = require('bcryptjs');





function registerUser(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            //console.log(hash);
            user.create({
                    username: req.body.username,
                    password: hash
                })
                .then(function(result) {
                    //console.log(result);
                    res.json({
                        satus: 201,
                        message: "You have regisr"
                    })
                })
                .catch(function(err) {
                    // console.log(err)
                    next(err);
                })
        });
    });
}






function validation(req, res, next) {
    // console.log(req.body.username);

    user.findOne({
            where: { username: req.body.username }
        })
        .then(function(result) {
            // console.log(result);
            if (result === null) {

                // res.send('user not found so registeed')
                next();

            } else {

                console.log('user was already registered');
                res.send('You are already registered')

            }
        })
        .catch(function(err) {

            next(err)

        })

}



function deleteUser(req, res, next) {
    user.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(result) {
            if (result === 0) {
                res.json({ status: 404, message: 'user not found' })
            } else {

            }
            console.log(result);
            res.json(result)

        })
        .catch(function(err) {
            next(err);
        })


}


module.exports = {
    registerUser,
    validation,
    deleteUser
}