const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    Project_id:{
        type: Schema.Types.ObjectId,
        ref: 'projects'
},
 Task:[
    {
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
    Duration:{
        type:String,
        required:true
    }
}
 ]
    

 
    
   
}, { timestamps: true })
module.exports = Category = mongoose.model('tasks',CategorySchema);