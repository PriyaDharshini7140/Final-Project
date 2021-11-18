const express = require('express');
const router = express.Router();
const Category = require('../model/CategorySchema');
var moment = require('moment');
router.post('/addCategory', async (req, res) => {
	// console.log(req.body);
	
	
	const category = new Category(req.body);
	category.Task.forEach((e)=>{
		var Start_date = moment(e.Start_date, "MM-DD-YYYY");
	var End_date = moment(e.End_date, "MM-DD-YYYY");
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

	const updates = req.body.Task.map((e)=> Object.keys(e));
	
	
	// console.log(updates);
		try {
			const category = await Category.findById(req.params.id)
			// console.log(category);
			if (!category) {
			   
				return res.status(404).send({ error: 'category not found' });
			}
			category.Task.forEach((TaskUpdate) => {
				req.body.Task.forEach((e)=>{
					TaskUpdate.Start_date=e.Start_date;
				TaskUpdate.End_date=e.End_date;
				TaskUpdate.Percentage=e.Percentage;
				var Start_date = moment(e.Start_date, "MM-DD-YYYY");
	var End_date = moment(e.End_date, "MM-DD-YYYY");
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
				})
			});
			 await category.save();
			res.send(category);
		} catch (err) {
			res.status(500).send({error: err.message});
		}
})
module.exports = router;