import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique : true,
            lowercase: true,
            trim: true,
            minLength: 2,
            maxLength: 30
        },
        password: {
            type: String,
            required: true,
            minLength: 5,
             maxLength: 20
        },
        email: {
            type: String,
            required: true,
             unique: true,
             lowercase: true,
             trim: true
        }
    },
    {
        timestamps: true
    }
)

// before saving any password we need to hash it
userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;
    try{
        this.password = await bcrypt.hash(this.password, 10);
    }catch(err){
        throw err;
    }
});

//csampare passwords
userSchema.methods.comparePassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    }catch(err){
        throw new Error(err);
    }
}

export const User = mongoose.model("User", userSchema);