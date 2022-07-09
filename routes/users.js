const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const { Mongoose } = require("mongoose");

router.post("/signup", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
        
		
	   await User.updateOne({userReferralCode: req.body.inviteReferralCode}, {$inc:{referredCount:1}})
		// User.findOne({ userReferralCode: req.body.inviteReferralCode },
		// 	function (err, user) {
		// 		if (err) { console.log(err) }
		// 		else {
		// 			console.log(user.referredCount);
		// 			console.log(user.userReferralCode);
		// 		}
		// 	}
		// )

		// console.log(req.body.inviteReferralCode);
		// User.find(function(err,users){
		// 	if(err) {console.log(err)}
		// 	else{
		// 		users.forEach(user => {
		// 			console.log(user.name);
		// 		});
		// 	}
		// })

		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



module.exports = router;
