const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

module.exports = async function HandleOtp(req, res) {

   /*  const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" }); */

    const otp = otpGenerator.generate(6, { digits : true , lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    var today = new Date(); 
    var minutes=parseInt(today.getMinutes()) +15 ; //OTP validation for 15 minutes
    var time = today.getHours() + ":" + minutes + ":" + today.getSeconds(); 

    const timedOtp={
      otp: otp,
      timeStamp: time
    }
    console.log(otp);
    const transporter = nodemailer.createTransport({
        service: "gmail",
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: true,
        auth: {

          user: 'bitcoinspinningwheel@gmail.com', // generated ethereal user
          pass: 'bitcoin@1234' 
        },
        
    });
console.log(req.body.email);
    const options = {
        from: "mkjam.007@gmail.com",
        // to: req.body.email,
        to: `${req.body.email}`,
        subject: "OTP For Signing-Up",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Dear User,</a>
          </div>
          
          <p>Your Email One Time Password (OTP) to log in to the Bitcoin Wheel of Fortune is </p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p>The OTP is valid for 15 minutes.<br/> This OTP will be used to verify the device you are loggin in from. For account safety, do not share yout OTP with others.</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
       
          </div>
        </div>
      </div>`
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
    res.send(timedOtp);
}