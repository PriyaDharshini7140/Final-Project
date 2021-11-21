const express = require('express');
const router = express.Router();
const Project = require('../model/ProjectSchema');
const Category=require('../model/CategorySchema');
var moment = require('moment');
router.post('/addProject', async (req, res) => {
	console.log(req.body);

	const project = new Project(req.body);
	var Start_date = moment(req.body.Start_date, "YYYY-MM-DD");
	var End_date = moment(req.body.End_date, "YYYY-MM-DD");
	console.log(Start_date,End_date);
	var d=End_date.diff(Start_date,"days");
	var date = moment.duration(d, "days").humanize();
	if(d  > 90){
		var d=End_date.diff(Start_date,"months")
		var date =moment.duration(d, "months").humanize();
		if(d > 12){
			var d=End_date.diff(Start_date,"years")
			var date =moment.duration(d, "years").humanize();
		}
	}
	console.log(date);
	project.Duration= date;
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
		// console.log(project);
		
		res.status(200).send(project)
		} catch (err) {
			res.status(500).send({error:err.message});
		}
})
router.patch('/updateProject/:id',async (req,res)=>{

	const updates = Object.keys(req.body);
	

	
		try {
			const project = await Project.findById(req.params.id)
			console.log(updates);
			if (!project) {
			   
				return res.status(404).send({ error: 'project not found' });
			}
			var Start_date = moment(req.body.Start_date, "MM-DD-YYYY");
	var End_date = moment(req.body.End_date, "MM-DD-YYYY");
	var d=End_date.diff(Start_date,"days");
	var date = moment.duration(d, "days").humanize();
	if(d  > 90){
		var d=End_date.diff(Start_date,"months")
		var date =moment.duration(d, "months").humanize();
		if(d > 12){
			var d=End_date.diff(Start_date,"years")
			var date =moment.duration(d, "years").humanize();
		}
	}
			project.Duration= date;
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
	console.log(req.body);
    try 
    {
        
		const category = await Category.findOne({ Project_id:req.body._id}).populate("Project_id")
		// console.log(category);
		res.status(200).send(category)
		} catch (err) {
			res.status(500).send({error:err.message});
		}
})
router.get("/getAlllProject",async (req,res)=>{
	
    try 
    {
        
		const category = await Category.find().populate("Project_id")
		 console.log(category);
		res.status(200).send(category)
		} catch (err) {
			res.status(500).send({error:err.message});
		}
})
module.exports = router;