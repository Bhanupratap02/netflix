/** @format */

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    _id:String,
    title: { type: String, required: true, unique: true },
    desc: { type: String,required:true },
    img: { type: String,required:true},
    imgTitle: { type: String},
    imgSm: { type: String},
    trailer: { type: String,required:true},
    video:{type:String,required:true},
    year:{type:String,required:true},
    limit:{type:Number,required:true},
    genre:{type:String,required:true},
    duration:{type:String},
    isSeries:{type:String,default:false},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
