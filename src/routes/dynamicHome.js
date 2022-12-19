const express = require("express");

const routes = express.Router();

const detailModel = require('../models/Detailmodel');
const sliderModel = require('../models/sliderModel');
const servicesModel= require('../models/servicesModel');
const queryModel = require("../models/queryModel");
const aboutModel = require("../models/aboutModel");




routes.get("/",async (req, res) => {
  //fetching the navigation bar section data from the database
  const navDetail =await detailModel.findById({"_id":"639598a34ddba701e11e3a4d"})
  // console.log(navDetail);

  //******fetching the slider section data from the database */
  const sliderDetail = await sliderModel.find()
  // console.log(sliderDetail);
  
  //fetching the services section data from the database
  const servicesDetail = await servicesModel.find()
  // console.log(servicesDetail);

  const aboutDetail = await aboutModel.findById({"_id":"639f20360c9e6da40420000d"})

  // sending the navigation bar,slider and services section data to index.hbs file in key value pair
  res.render("index",{
    details:navDetail,
    slider:sliderDetail,
    services:servicesDetail,
    about:aboutDetail
  });
});


routes.get("/sofa",async (req, res) => {

  const navDetail =await detailModel.findById({"_id":"639598a34ddba701e11e3a4d"})

  //sending the navigation bar data section to the sofas.hbs file in key value pair
  res.render("sofas",{
    details:navDetail
  });
});


// process to send queries of customer to the database
routes.post("/query", async (req,res)=>{
    try {
      
      const queryData = await queryModel.create(req.body);
      console.log(queryData);
      res.redirect("/")

    } catch(e) {
      console.log(e);
      res.redirect("/")
    }
})

module.exports = routes;

// to configure different web pages we need to create different routes  and export the module and use it through app.use('/',routes)
