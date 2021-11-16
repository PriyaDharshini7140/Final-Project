const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    Project_id:{
        type: Schema.Types.ObjectId,
        ref: 'Projects'
},
 
    UI :{
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
    }
},
API:{
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
    }
},
   DB:{
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
    }
   },
   TEST:{
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
    }
   }
    
   
}, { timestamps: true })
module.exports = Category = mongoose.model('tasks',CategorySchema);