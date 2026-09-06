const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/UserModel");

// Sign Up
const signup = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(404).json({
                success: false,
                message: "All field is required"
            });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a user
        const user = await User.create({
            name,
            email, 
            password: hashedPassword
        });

        res.status(200).json({
            success: true,
            message: "User Regisiter successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
};


// 