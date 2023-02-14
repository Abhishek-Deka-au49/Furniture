const dotenv = require('dotenv')
dotenv.config()
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const routes = require("./src/routes/mainRouter");
const router = require("./src/routes/authRouter")
const app = express();
const cookieParser = require("cookie-parser");

const detailModel = require('./src/models/Detailmodel');
const sliderModel = require('./src/models/sliderModel');
const servicesModel = require('./src/models/servicesModel');
const aboutModel = require('./src/models/aboutModel');
const dModel = require('./src/models/diningModel');
const bModel = require('./src/models/bedModel')


const { connectDB } = require("./dbconfig");
const sModel = require("./src/models/sofaModel");
connectDB()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// parse application/json
app.use(bodyParser.json())


const PORT = process.env.PORT || 8000

// sending the services section data to the database to make it dynamic

// async function sendServicesDetail(){
  
//     await servicesModel.create([
//       {
//         icon:'fa-sharp fa-solid fa-truck',
//         title:'Pan-India Delivery',
//         Description:'We provide Door to Door Delivery.',
//         linkText:'support',
//         link:'https://www.amazom.com'
//       },
//       {
//         icon:'fa-solid fa-gear',
//         title:'Free Installation',
//         Description:'Client will call you 24 hours after the delivery.',
//         linkText:'support',
//         link:'https://www.amazom.com'
//       },
    
//     ])
//     }
//     sendServicesDetail()

//********************************************************************* */




//**********sending the slider section data to the database to make it dynamic */
// async function sendSliderDetail(){
  
//   await sliderModel.create([
//     {
//       title:'Omega Fabric 3 Seater Sofa',
//       subTitle:'Bestsellers of the year at the lowest price ever',
//       imageUrl:"/static/images/sofa1.jpg"
//     },
//     {
//       title:'White-oak 6 seater Dining Set',
//       subTitle:'Beautify your home with modern style furniture designed just for you at upto 55% off',
//       imageUrl:"/static/images/dining.jpg"
//     },
//     {
//       title:'Boston solid wood queen size bed',
//       subTitle:'Teak wood finish with Box storage available at zero cost EMI',
//       imageUrl:"/static/images/bed.jpg"
//     }
//   ])
//   }
//   sendSliderDetail()

//******************************************** */




//********sending nav bar section data to to the database to make it dynamic ******

// async function sendDetail(){
  
// await detailModel.create({
//   brandName:"WoodPecker",
//   brandIconUrl:"https://yt3.ggpht.com/ytc/AMLnZu8ZoOI1hsfE9DET1nqFHyLscyNjERFC6VrwrkUwWOk=s48-c-k-c0x00ffffff-no-rj",
//   links:[
//     {
//       label:"Home",
//       url:"/"
//     },
//     {
//       label:"sofas",
//       url:"/sofas"
//     },
//     {
//       label:"Beds",
//       url:"/beds"
//     },
//     {
//       label:"Dining",
//       url:"dining"
//     },
//     {
//       label:"Contact us",
//       url:"/contact-us"
//     }
   
//   ]
// })
// }
// sendDetail()

//***************************************************************************/

//Sending About section to the Database

// async function sendAbout(){
//     await aboutModel.create({
//       title:'About Us',
//       subTitle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deserunt dolores architecto nostrum temporibus iste cum vero qui quae accusamus sint amet nulla, sequi quam nesciunt eaque dignissimos, expedita maiores.'
//     })
// }
// sendAbout()


// sending sofa section to the database 

// async function sofasData(){
//   await sModel.create([
//     {
//     url:"/",
//     imageUrl:"/static/images/sofa1.jpg",
//     title:"King size Bed",
//     price:"&#8377; 25000"
//     },
//     {
//     url:"/",
//     imageUrl:"/static/images/sofa3.jpg",
//     title:"King size Bed",
//     price:"&#8377; 25000"  
//     },
//     {
//     url:"/",
//     imageUrl:"/static/images/sofa3.jpg",
//     title:"King size Bed",
//     price:"&#8377; 25000"
//     }
 
//   ])
// }
// sofasData()



// sending Dining data to the database one time to make it dynamic so that we can fetch the data from the database

// async function diningData(){
//   await dModel.create([
//     {
//       url:"/",
//       imageUrl:"/static/images/sofa1.jpg",
//       title:"King size Bed",
//       price:"&#8377; 25000"
//     },
//     {
//       url:"/",
//       imageUrl:"/static/images/sofa3.jpg",
//       title:"King size Bed",
//       price:"&#8377; 25000"  
//     },
//     {
//       url:"/",
//       imageUrl:"/static/images/sofa3.jpg",
//       title:"King size Bed",
//       price:"&#8377; 25000"
//     }
//   ])
// }
// diningData()
    

// sending Dining data to the database one time to make it dynamic so that we can fetch the data from the database


// async function bedData(){
//   await bModel.create([
//     {
//       url:"/",
//       imageUrl:"/static/images/sofa1.jpg",
//       title:"King size Bed",
//       price:"&#8377; 25000"
//     },
//     {
//       url:"/",
//       imageUrl:"/static/images/sofa3.jpg",
//       title:"King size Bed",
//       price:"&#8377; 25000"  
//     },
//     {
//       url:"/",
//       imageUrl:"/static/images/sofa3.jpg",
//       title:"King size Bed",
//       price:"&#8377; 25000"
//     }
//   ])
// }
// bedData()


//static/css/style.css
app.use('/static',express.static('public'))
//middleware
app.use("/", routes);
app.use("/", router);



//(template engine) Middleware

app.set("view engine", "hbs");
app.set("views", "views");
hbs.registerPartials("views/partials")

// console.log(process.env.SESSION_KEY);


 

app.listen(PORT, () => {
  console.log("server started successfully");
});
