import mongoose from 'mongoose';

const userSchems = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    friends : [{
        type : String
    }]
},{timestamps:true});

const User = mongoose.model("User",userSchems);

export default User;