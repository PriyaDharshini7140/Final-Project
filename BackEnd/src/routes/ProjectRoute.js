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
router.patch('/updateProject/:id',async (req,res)=>{

	const updates = Object.keys(req.body);
	
	
		try {
			const project = await Project.findById(req.params.id)
			console.log(project);
			if (!project) {
			   
				return res.status(404).send({ error: 'project not found' });
			}
			
				updates.forEach((update)=>{
					
					project[update]=req.body[update]
				})
		
			 await project.save();
			res.send(project);
		} catch (err) {
			res.status(500).send({error: err.message});
		}
})
router.post("/getAProject",async (req,res)=>{
    try 
    {
        const project= await Project.findOne({_id:req.body._id})
		
		const category = await Category.find({ Project_id:req.body._id})
		console.log(category);
		res.status(200).send(project)
		} catch (err) {
			res.status(500).send({error:err.message});
		}
})
module.exports = router;