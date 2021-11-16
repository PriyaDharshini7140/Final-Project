const express = require('express');
const router = express.Router();
const Project = require('../model/ProjectSchema');
const Category=require('../model/CategorySchema');
router.post('/addProject', async (req, res) => {
	console.log(req.body);

	const project = new Project(req.body);
	try {
		await project.save();
		res.status(201).send(project);
	} catch (error) {
		
		res.status(500).send({error:error.message});
	}
});

router.get("/getAllProject",async (req,res)=>{
    try 
    {
		const project = await Project.aggregate([{
			$lookup:{
             from:"tasks",
			 localField:'_id',
			 foreignField:'Project_id',
			 as:'category'
			}
		}]).sort({createdAt: 'desc'})
		console.log(project);
		
		res.status(200).send(project)
		} catch (err) {
			res.status(500).send({error:err.message});
		}
})

// router.post("/getAProject",async (req,res)=>{
//     try 
//     {
//         const project= await Project.findOne({_id:req.body._id},(err,category)=>{
               
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 Category.find({},(err,task)=>{
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                       return task.filter((e)=>e._id === category._id)
//                     }
//                 })
//             }
//         })
		
// 		console.log("ggbbb",project);
		
// 		res.status(200).send(project)
// 		} catch (err) {
// 			res.status(500).send({error:err.message});
// 		}
// })
module.exports = router;