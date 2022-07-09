const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");




router.post("/wheel", async(req,res)=>{
	// const user = await User.findOne({ email: emailOfUser });
	// try {
	// 	const user = await User.findOne({ email: emailOfUser });
	// 	return res.send({ success: true, data: user });
	//   } catch (err) {
	// 	console.log(err);
	//   }
    console.log("hiii")
    console.log(req.body);
	await User.updateOne({email: req.body.email}, {$push: {prizes: req.body.prizeName}})
})



module.exports = router;
