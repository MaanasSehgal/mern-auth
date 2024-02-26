const User = require("../models/user");
const {hashPassword, comparePassword} = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
    res.json("test is working");
};

//REGISTER ENDPOINT
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        //Check if name was entered
        if (!name) {
            return res.json({
                error: "Please enter your name",
            });
        }
        //check good password
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be at least 6 characters long",
            });
        }
        //check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: "Email already exists!",
            });
        }

        const hashedPassword = await hashPassword(password);
        //create new user in database
        const user = await User.create({name, email, password: hashedPassword})
            .then((user) => {
                res.json({user});
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    error: "Error occurred. Please try again",
                });
            });
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }

        //check if password is correct
        const match = await comparePassword(password, user.password);
        if (match) {
            const token = jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json(user);
            });
            return res.json({token});
        }

        return res.json({
            error: "Invalid Email or Password",
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: "Error occurred. Please try again",
        });
    }
};

const getProfile = (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            return res.json(user);
        });
    } else {
        res.json(null);
    }
};

module.exports = {test, registerUser, loginUser, getProfile};
