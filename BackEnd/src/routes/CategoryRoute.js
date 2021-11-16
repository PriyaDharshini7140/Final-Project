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

router.patch('/updateCategory',async (req,res)=>{

		try {
			const category = await Category.findOneAndUpdate({_id:req.body._id},{
                $set:{
                    
                }
            })
			console.log(category);
			if (!category) {
			   
				return res.status(404).send({ error: 'category not found' });
			}
			category.UI.Start_date=req.body.UI.Start_date
            category.UI.End_date=req.body.UI.End_date
            category.UI.Percentage=req.body.UI.Percentage
            category.API.Start_date=req.body.API.Start_date
            category.API.End_date=req.body.API.End_date
            category.API.Percentage=req.body.API.Percentage
            category.DB.Start_date=req.body.DB.Start_date
            category.DB.End_date=req.body.DB.End_date
            category.DB.Percentage=req.body.DB.Percentage
            category.TEST.Start_date=req.body.TEST.Start_date
            category.TEST.End_date=req.body.TEST.End_date
            category.TEST.Percentage=req.body.TEST.Percentage
			 await category.save();
			res.send(category);
		} catch (err) {
			res.status(500).send({error: err.message});
		}
})
module.exports = router;