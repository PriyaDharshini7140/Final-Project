const express = require('express');
const router = express.Router();
const Category = require('../model/CategorySchema');
var moment = require('moment');
router.post('/addCategory', async (req, res) => {
	 console.log(req.body);
	
	
	const category = new Category(req.body);
	category.Task.forEach((e)=>{
		var Start_date = moment(e.Start_date, "YYYY-MM-DD");
	var End_date = moment(e.End_date, "YYYY-MM-DD");
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
	e.Duration=date
	})
	try {
		await category.save();
		res.status(201).send(category);
	} catch (error) {
		
		res.status(500).send({error:error.message});
	}
});

router.patch('/updateCategory/:id',async (req,res)=>{

	
	console.log(req.body);
	
	
		try {
			const category = await Category.findOne({Project_id:req.params.id})
			 
			if (!category) {
			   
				return res.status(404).send({ error: 'category not found' });
			}
			category.Task.forEach((TaskUpdate) => {
					if(req.body.Task_name === TaskUpdate.Task_name){
						TaskUpdate.Start_date=req.body.Start_date;
						TaskUpdate.End_date=req.body.End_date;
						TaskUpdate.Percentage=req.body.Percentage;
						var Start_date = moment(req.body.Start_date, "YYYY-MM-DD");
						console.log(Start_date);
			var End_date = moment(req.body.End_date, "YYYY-MM-DD");
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
			TaskUpdate.Duration=date
					}
					
				})
		
			  await category.save();
			res.send(category);
		} catch (err) {
			res.status(500).send({error: err.message});
		}
})
module.exports = router;