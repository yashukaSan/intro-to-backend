import { User } from "../models/user.model.js";

const registerUser = async(req, res) => {
    try{
        const { username, email, password } = req.body;

        //basic validation

        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required1!" });
        }

        //chacke if user exist

        const existing = await User.findOne({email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({ message: "User already exist!!" });
        }

        const userName = await  User.username.findOne({username: username.toLowerCase()});
        if(userName){
            return res.status(400).json({ message: "User Name alreday Taken! \n Use Another one"});
        }

        //create user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
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

export {
    registerUser
};