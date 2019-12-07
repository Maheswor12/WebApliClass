var user = require('../model/UserModel.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

function validator(req, res, next) {
    // to check wheather the username is empty or not
    if (req.body.username === "") {
        res.send('username cannot be empty');
    }
    user.findOne({
            where: { username: req.body.username }
        })
        .then(function(result) {
            // console.log(result);
            if (result === null) {
                //res.send("please registered first");
                console.log("registered first");
            } else {
                req.passwordFromDB = result.dataValues.password;
                next();
            }
        })

    .catch(function(err) {

    })

    next()
}


function passwordCheck(req, res, next) {
    bcrypt.compare(req.body.password, req.passwordFromDB)
        .then(function(result) {
            if (result === true) {
                next()

            } else {
                res.send('Invalid PAssword');
                // next({status:500,message:'Invalid PAssword'})
            }
        })
        .catch(function(err) {
            next(err);
            // next({status:500,message:'ERROROROR'})
        })


}





function jwtTokenGEN(req, res) {
    // console.log(req.body.username);
    var payloadd = {
            uername: req.body.username,
            userLevel: 'superadmin',
        }
        // var token = jwt.sign(payload, secretOrPrivatekey);
    jwt.sign(payloadd, 'thisisSecretKey', { expiresIn: "10h" }, function(err, resultToken) {
        // console.log(err)
        // console.log(resultToken)
        res.json({ "usertoken": resultToken })
    })
}

// function verfiyToken(req, res, next) {
//     if (req.headers.authorization === null) {
//         res.json({ status: 401, message: "Unauthorized" })
//     }
//     //console.log(req.headers.authorization);
//     var token = req.headers.authorization.slice(7, req.headers.authorization.length)

//     jwt.verify(token, 'thisisSecretKey', function(err, result) {
//         //console.log(err);
//         //console.log(result);

//         //check result then next to another middleware

//         next()

//     })

//     //token verify 
//     // next()

// }


module.exports = {
    validator,
    passwordCheck,
    jwtTokenGEN,
    verfiyToken
}