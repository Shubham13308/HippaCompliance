var models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authMiddleware=require('../middleware/authMiddleware')
const userValidator=require('../validator/userValidator')

exports.registerUser = function(req, res) {
    const { Username, Password, Role } = req.body;
 
    const uservalidationError=userValidator.userValidator(req.body);
    if(uservalidationError){
        return res.status(400).send({ message: uservalidationError });
    }
    models.User_info.findOne({ where: { Username } })
        .then(userExist => {
            if (userExist) {

                return res.status(400).json({ error: "User already exists" });
            }

           
            return bcrypt.hash(Password, 10);
        })
        .then(hashedPassword => {
            
            return models.User_info.create({
                Username,
                Password: hashedPassword,
                Role,
                LastLogin: new Date()
            });
        })
        .then(newUser => {
            
            return res.status(201).json({ message: "User created", data: newUser });
        })
        .catch(error => {
            console.error("Error registering user:", error);
            return res.status(500).json({ error: "An error occurred while registering the user" });
        });
};

exports.registerLogin = function(req, res) {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).json({ error: "Enter all the fields" });
    }

    models.User_info.findOne({ where: { Username: Username } })
        .then(userExist => {
            if (!userExist) {
                return res.status(404).json({ error: "User does not exist" });
            }

            return bcrypt.compare(Password, userExist.Password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ error: "Incorrect password" });
                    }

                    userExist.LastLogin = new Date();
                    return userExist.save();
                })
                .then(updatedUser => {
                    const token=jwt.sign(
                        {Username:updatedUser.Username,Role:updatedUser.Role},
                        'token456789',
                        {expiresIn:'2h'}
                    )
                    
                    return res.status(200).json({ message: "Login successful", user: token });
                });
                ;
                
        })
        .catch(error => {
            console.error("Error during login:", error);
            if (!res.headersSent) {
                return res.status(500).json({ error: "An error occurred during login" });
            }
        });
};

exports.dashboard = [authMiddleware.VerifyToken, function(req, res) {
    console.log(req.user.Role)
    res.status(200).json({ message: "Welcome to the dashboard!", user: req.user });
}];





