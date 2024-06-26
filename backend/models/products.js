const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"product name can't be empty"],
        maxlength:[30,"product name shouldn't be more than 20 characters."],
        minlength:[3,"product name shouldn't be less than 3 characters."]
    },
    category:{
        type:String,
        trim:true,
        required:[true,"category field shouldn't be empty"],
        maxlength:[12,"category name shouldn't be more than 9 characters"],
        minlength:[3,"category name shouldn't be less than 3 characters"]
    },
    quantity:{
        type:Number,
        required:[true,"please specify a quantity"]
    },
    sold:{
        type:Number,
        trim:true,
        default:0,
    },
    price:{
        type:Number,
        required:[true,"please put in a price for the product"]
    },
    description:{
        type:String,
        trim:true,
        required:[true,"please put in a product description"],
    },
    image:{
        type:String
    },
    publicID:{
        type:String,
        required:[true,"please provide a publicID link"]
    },
    productViews:{
        viewCount:{
            type:Number,
            default:0
        }
    },
    ratings:{
        type:[Object]
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:[true,"please provide a user"]
    }

},{timestamps:true});

module.exports = mongoose.model("products",ProductsSchema)