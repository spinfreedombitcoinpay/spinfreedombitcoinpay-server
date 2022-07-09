const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// let emailOfUser="";

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		// emailOfUser = user.email;
		// console.log(user.referredCount);
	    // console.log(user.userReferralCode);
        
    //    await router.get("/Dashboard", async(req,res)=>{
	// 		const user = await User.findOne({ email: emailOfUser });
	// 		// console.log(user.referredCount);
	// 		// console.log(user.userReferralCode);
		
	// 		try {
	// 			const user = await User.findOne({ email: emailOfUser });
	// 			return res.send({ success: true, data: user });
	// 		  } catch (err) {
	// 			console.log(err);
	// 		  }
	// 	})


		if (!user)
			return res.status(401).send({ message: "Email is not registered!" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

// router.get("/Dashboard", async(req,res)=>{
// 	const user = await User.findOne({ email: emailOfUser });
// 	// console.log(user.prizes);
// 	// console.log(user.userReferralCode);

// 	try {
// 		const user = await User.findOne({ email: emailOfUser });
// 		return res.send({ success: true, data: user });
// 	  } catch (err) {
// 		console.log(err);
// 	  }
// })
//forLogout
// router.post("/Dashboard", async(req,res)=>{
// 	emailOfUser="";
// })

// for isLoggedIn function
// router.get("/wheel", async(req,res)=>{
// 	const user = await User.findOne({ email: emailOfUser });
// 	// console.log(user.referredCount);
// 	// console.log(user.userReferralCode);

// 	try {
// 		const user = await User.findOne({ email: emailOfUser });
// 		return res.send({ success: true, data: user });
// 	  } catch (err) {
// 		console.log(err);
// 	  }
// })

// router.post("/wheel", async(req,res)=>{
// 	// const user = await User.findOne({ email: emailOfUser });
// 	// try {
// 	// 	const user = await User.findOne({ email: emailOfUser });
// 	// 	return res.send({ success: true, data: user });
// 	//   } catch (err) {
// 	// 	console.log(err);
// 	//   }
// 	const item = req.body
// 	await User.updateOne({email: emailOfUser}, {$push: {prizes: item}})
// })

router.post("/wheel", async(req,res)=>{
	// const user = await User.findOne({ email: emailOfUser });
	// try {
	// 	const user = await User.findOne({ email: emailOfUser });
	// 	return res.send({ success: true, data: user });
	//   } catch (err) {
	// 	console.log(err);
	//   }
    // console.log("hiii")
    console.log(req.body);
	await User.updateOne({email: req.body.email}, {$push: {prizes: req.body.prizeName}})
})

router.post("/Dashboard", async(req,res)=>{
	// const myemail = req.body.myemail;
   const user = await User.findOne({ email: req.body.email });
   try {
	   const user = await User.findOne({ email: req.body.email });
	   return res.send({ success: true, data: user });
	 } catch (err) {
	   console.log(err);
	 }
})

module.exports = router;
