const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
    {
        name:{
            trim:true,
            type:String,
            required:[true,"please fill in a category"],
            maxlength:[10,"category name shouldn't be more than 10 characters"],
            minlength:[3,"category name shouldn't be less than 3 characters"]
        },
        slug:{
            type:String,
            unique:true,
            lowercase:true,
            index:true // setting index to true specifies that an index shld be created for this particular field in mongoDB collection. Indexes improve the speed of read queries by allowing the database to quickly locate the data without scanning the entire collection.
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("category",categorySchema)
