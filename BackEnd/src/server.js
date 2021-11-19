require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const port = 4000;

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors());

const project = require('./routes/ProjectRoute')
const category = require('./routes/CategoryRoute')
mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("mongodb connected");
}).catch((err)=>{
    console.log({err: err });
})

app.use('/project',project)
app.use('/category',category)
app.listen(port,(err)=>{
if(err){
    console.log( {err : err});
}
console.log("server running on port" +port);
});