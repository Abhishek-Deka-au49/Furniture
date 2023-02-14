const express = require("express");

const router = express.Router();
const signupModel = require("../models/signupModel");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");


router.use(cookieParser());


 

router.get("/",(req,res)=>{
   res.render("index")
})
router.get("/login",(req,res)=>{
   res.render("login")
})
router.get("/register",(req,res)=>{
   res.render("register")
})
router.get("/sofa",(req,res)=>{
   // console.log(`the cookie is : ${req.cookies.jwt}`)
   res.render("sofas")
})

router.post("/register",async (req,res)=>{
   try {
      const { 
         name,
         email,
         password,
         cpassword 
      } = req.body; 
   if(password === cpassword){
      const password = await bcrypt.hash(req.body.password,10)
      const userData = new signupModel({
         name,
         email,
         password,
      })
      console.log("the success part" + userData);
      
      const token = await userData.generateAuthToken();
      console.log(`the token part is : ${token}`);

      //The res.cookie() function is used to set the cookie name to value
         res.cookie("jwt",token,{
            expires:new Date(Date.now() + 60000)
         })
      
      userData.save(err=>{
         if (err) {
            console.log("Error");
         } else {
            
            res.redirect("/login")
         }
      })
   } else{
      res.render("register")
   }


   } catch (error) {
      res.redirect("/register")
   }
})

router.post("/login", async (req,res)=>{
   try {
      const email = req.body.email
      const password = req.body.password
      const RegisteredUserEmail = await signupModel.findOne({email:email})
      const userPassword = await bcrypt.compare(password,RegisteredUserEmail.password);
      const token = await RegisteredUserEmail.generateAuthToken();
      console.log(`the token part is : ${token}`);

      res.cookie("jwt",token,{
         expires:new Date(Date.now() + 6000000)
      })

      if(userPassword){
         res.status(201).redirect("/")
      }else{
         res.status(400).render("error")
      }
   } catch (e) {
      res.status(400).render("error")
   }
})

router.get("/logout",auth, async(req,res)=>{
   try {
      console.log(req.user);
      req.user.tokens = req.user.tokens.filter((currElement)=>{
         return currElement.token !== req.token
      })
      res.clearCookie("jwt");
      console.log("logout successfully");
      await req.user.save()
      res.render("login")
   } catch (error) {
      res.status(500).render("error")
   }
})



module.exports = router;

  