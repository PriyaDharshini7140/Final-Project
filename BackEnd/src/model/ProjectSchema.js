const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
    Task_name:{
        type:String,
        required:true
    },
    Start_date:{
        type:String,
        required:true
    },
    End_date:{
        type:String,
        required:true
    },
    Percentage:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Duration:{
        type:String,
        required:true
    }
}, { timestamps: true })
module.exports = Project = mongoose.model('projects',ProjectSchema);