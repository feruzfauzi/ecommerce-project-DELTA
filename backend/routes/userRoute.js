import express from "express";
import User from "../models/userModel"
import { getToken, isAuth } from "../util";
import bcrypt from "bcryptjs";
const saltRounds =10;

const router = express.Router();




router.post("/signin",async (req,res)=>{
    

 
    const signinUser = await User.findOne({
        email: req.body.email,
    });
    if (signinUser) {
        bcrypt.compare(req.body.password,signinUser.password,async (err,result)=>{
           if(result)
           {
            res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser)
            })
           }
        })
     
    }
    else{
        res.status(401).send({msg:'Invalid Credentials'});
    }
})

router.put("/:id",async (req,res)=>{
    
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user)
    {   
        bcrypt.hash(req.body.password,saltRounds,async (err,hash)=>{
           
            {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.password = hash || user.password;
                const updatedUser = await user.save();
                res.send({
                    _id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    token: getToken(updatedUser)
                })
            }
     
        })
    }
    
    else
    {
        res.status(404).send({msg:'User Not Found'});
    }
})


router.post("/register",async (req,res)=>{

    bcrypt.hash(req.body.password,saltRounds,async (err,hash)=>{
        const user = new User({
            name: req.body.name,
            email:req.body.email,
            password: hash
        });
        const newUser = await user.save();
 
        if (newUser) {
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }
        else{
            res.status(401).send({msg:'Invalid User Data'});
        }

    })


  
})


router.get("/createadmin",async(req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('123', salt);

    try{
        const user =  new User({
            name: 'Rajath',
            email: 'soulshine@gmail.com',
            password:  hash,
            isAdmin: true
        });
      
        const newUser = await user.save();
        res.send(newUser);

    }
    catch(error){
       res.send({msg:error.message});
    }


  
})

export default router;