const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ProductSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    category:{
        type:{},
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    attributes:{
        type:[{}],
        required:true
    },
    commonImages:{
        type:[{}],
        required:true
    },
    isDisable:{
        type:Boolean,
        default:false,
        required:true
    }
});

module.exports = mongoose.model("Product",ProductSchema);