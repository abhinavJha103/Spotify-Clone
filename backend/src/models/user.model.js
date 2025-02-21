import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unqiue:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    }
},{timestamps:true});

UserSchema.pre("save", async function (next) {
    try {
        const salt = await  bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt)
        
    } catch(error) {
        console.log("Some error Occured while Hashing the User password ", error.message)
    }
    next();
})

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;


