const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	fname: { type: String, required: true },
	lname: { type: String, required: true },
	email: { type: String, required: true },
	country: { type: String, required: true },
	number: { type: Number },

	password: { type: String, required: true },
	inviteReferralCode: {
		type: String
	},
	userReferralCode: {
		type: String
	},
	referredCount:{
		type:Number
	},
	prizes: [{type: String, default: ""}],
	// prizeCount:{
	// 	type: Number,
	// 	default:0
	// }
	//prize count not necessary for now
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		fname: Joi.string().required().label("First Name"),
		lname: Joi.string().required().label("Last Name"),
		
		email: Joi.string().email().required().label("Email"),
		country: Joi.string().required().label("Country"),
		number: Joi.number().label("Whatsapp number"),
		// password: passwordComplexity().required().label("Password"),
		// cpassword:passwordComplexity().required().label("Confirm Password"),/* passwordComplexity(). */
		password: Joi.string().required().label("Password"),
		cpassword:Joi.string().required().label("Confirm Password"),/* passwordComplexity(). */

		inviteReferralCode: Joi.string().label("Invite Referral Code"),
		userReferralCode: Joi.string().label("User Referral Code"),
		referredCount: Joi.number().label("Referred Count"),
		prizes: Joi.array().label("prizes"),
		// prizeCount: Joi.number().label("prizeCount"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
