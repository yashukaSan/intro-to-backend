import { User } from "../models/user.model.js";

const registerUser = async(req, res) => {
    try{
        const { username, email, password } = req.body;

        //basic validation

        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required1!" });
        }

        //chacke if user exist

        const existing = await User.findOne({ email: email.toLowerCase()} );
        if(existing){
            return res.status(400).json({ message: "User already exist!!" });
        }

        const userName = await  User.findOne({username: username.toLowerCase()});
        if(userName){
            return res.status(400).json({ message: "User Name alreday Taken! \n Use Another one"});
        }

        //create user

        const user = await User.create({
            username: username,
            email: email.toLowerCase(),
            password: password,
            loggedIn: false
        });

        res.status(201).json({
            meassage: "User Registered Successfully",
            user: {id:user._id, email: user.email, username: user.username}
        });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error!!", error: err.message})
    }
}

const loginUser = async (req, res) => {
    try{
        //checking if the already exist
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({ message: "User not found" });

        //checking the passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch)  return res.status(400).json({
            message: "Invalid creadentials"
        });

        res.status(200).json({
            message: "User Logged in", 
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    }
    catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const logoutUser = async (req, res) => {
    try{
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout Successful"
        });
    }catch(err){
        res.status(500).json({
            message: "Internal server error"
        });

    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};