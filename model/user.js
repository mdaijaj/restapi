import mongoose from "mongoose"; 
// const Schema = mongoose.Schema

var userSchema=  new mongoose.Schema({
    username: {
       type: String,
       require: true,
       trim: true
    },
    email:{
        type: String,
        require: true, 
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    }
}, {
    timestamps: true
});

const User=mongoose.model('User', userSchema);

export default User;