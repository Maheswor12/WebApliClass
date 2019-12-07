"use strict";
const doctorExpress = require("express");
const app = doctorExpress();
var bodyParser = require('body-parser');
var userController = require('./controller/User_Controller.js');
var loginController = require('./controller/Login_Controller.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/registration", userController.validation, userController.registerUser);
app.post("/userlogin", loginController.validator);
app.delete('/users/:id', userController.deleteUser);

app.get('/userslist', loginController.validator, loginController.passwordCheck, loginController.jwtTokenGEN, loginController.verfiyToken);
app.use('/*', function(req, res) {
        res.status(404)
        res.send('NOT FOUND')
    })
    // error handlig 1st param err
app.use(function(err, req, res, next) {

    console.log(err.message);
    res.json({
        status: 500,
        message: err.message
    })
    res.send(err.message)
})
app.listen(3100);