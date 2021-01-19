import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import config from "./config";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error=> console.log(error.reason));


dotenv.config()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


 app.use("/api/users",userRoute);
 app.use("/api/products",productRoute);
 app.use("/api/orders",orderRoute);
 app.get("/api/config/paypal",(req,res)=>{
   res.send(config.PAYPAL_CLIENT_ID);
 })




 app.listen(5000,function(req,res){
     console.log("Server started on port 5000");
 });