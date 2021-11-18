const express = require('express');
const router = express.Router();
const Category = require('../model/CategorySchema');

router.post('/addCategory', async (req, res) => {
	console.log(req.body);

	const category = new Category(req.body);
	try {
		await category.save();
		res.status(201).send(category);
	} catch (error) {
		
		res.status(500).send({error:error.message});
	}
});

router.patch('/updateCategory/:id',async (req,res)=>{

	const updates = Object.keys(req.body.UI);
	console.log(updates);
	const Task = Object.keys(req.body);
	
		try {
			const category = await Category.findById(req.params.id)
			console.log(category);
			if (!category) {
			   
				return res.status(404).send({ error: 'category not found' });
			}
			Task.forEach((TaskUpdate) => {
				updates.forEach((update)=>{
					
			category[TaskUpdate][update]=req.body[TaskUpdate][update]
				})
			});
			 await category.save();
			res.send(category);
		} catch (err) {
			res.status(500).send({error: err.message});
		}
})
module.exports = router;