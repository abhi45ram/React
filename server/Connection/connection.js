const mongoose = require("mongoose");

const connection = async(req,res) =>{
    try {
        await mongoose.connect("mongodb+srv://Users:Abhishek7@cluster0.obnayiv.mongodb.net/").then(() => {
        console.log("Connected Successfull");
    })
    } catch (error) {
        res.status(400).json({
            message: "Not Connected",
        });
    }
};
connection();