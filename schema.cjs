const mongoose = require('mongoose')

const restaurant = new mongoose.Schema({
    area :{
     type : String
    },
    avgRating :{
        type:Number,
        required : true
    },
    costfortwo:{
        type :String
    },
    cuisines :{
        type :Array
    },
    name: {
        type :String
    }
},{versionKey:false})

const Restaurant = mongoose.model('restaurantDetails',restaurant)

const userSchema =new mongoose.Schema({
    contact:{
        type:Number
    },
    email :{
        type : String,
        required :true,
        unique : true
    },
    password :{
        type :  String,
        reqiured : true
    },
    userName :{
        type:String,
        required :true,
        unique : true
    }
},{versionKey : false})
//model
const Users = mongoose.model('userDetails',userSchema)

module.exports ={Restaurant,Users}