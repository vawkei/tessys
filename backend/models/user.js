const mongoose = require("mongoose");

const UserSchema  = mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:[true,"please enter your name"],
            maxlength:[10,"name shouldn't be more than 10 characters"],
            minlength:[3,"name shouldn't be less than 3 characters"]
        },
        surname:{
            type:String,
            trim:true,
            maxlength:[15,"surname shouldn't be more than 15 characters"],
            minlength:[4,"surname shouldn't be less than 4 characters"]
        },
        email:{
            type:String,
            trim:true,
            required:[true,"please enter your email address"],
            unique:true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please Provide a valid email",
              ],
        },
        password:{
            type:String,
            trim:true,
            required:[true,"please insert your password"],
            minlength:[6,"password shouldn't be less than 6 characters"]
        },
        passwordToken:{
            type:String
        },
        passwordExpirationDate:{
            type:Date
        },
        role:{
            type:String,
            required:[true,"please specify your role"],
            enum:["customer","admin"],
            default:"customer"
        },
        verificationToken:{
            type:String
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        verifiedDate:{
            type:Date
        },
        phone:{
            type:String,
            trim:true,
            // required:[true,"please enter your phone number"],
            maxlength:[11,"please phone number should be 11 digits"],
            minlength:[11,"please phone number should be 11 digits"]
        },
        address:{
            type:String,
            trim:true,
        },
        town:{
            type:String,
            trim:true,
            maxlength:[12,"name of your town shouldn't be more than 12 characters"],
            minlength:[3,"name of your town shouldn't be less than 3 characters"]
        },
        state:{
            type:String,
            trim:true,
            maxlength:[10,"name of your state shouldn't be more than 10 characters"],
            minlength:[3,"name of your state shouldn't be  less than 3"]
        },
        photo:{
            type:String,
            trim:true,
            required:[true,"please add your photo"],
            default:"https://i.ibb.co/4pDNDk1/avatar.png"
        },
        cartItems:{
            type:[Object]
        },
        newsletterSubscription:{
            type:Boolean,
            default:false
        }
    },{timestamps:true}
);

module.exports = mongoose.model("user",UserSchema)