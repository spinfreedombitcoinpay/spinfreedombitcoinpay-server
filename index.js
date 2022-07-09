require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");//Route for resgister page
const authRoutes = require("./routes/auth");//Route for Signup page
const HandleOtp= require("./routes/handleotp");
const ResetPassword=require("./routes/ResetPassword")
const WheelPrizes= require("./routes/wheelprize")


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.post("/api/handleotp", HandleOtp);
app.use('/api/resetpassword', ResetPassword)
app.use('api/wheelprize', WheelPrizes )


// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
//     const path = require("path");
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     })
// }

const path = require("path")
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
