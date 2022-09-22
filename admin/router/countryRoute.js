const router = require("express").Router();
const {countryModel,stateModel,citieModel} =require("../model/countryModels")

// country api
router.get("/countries",async(req,res)=>{
    const data = await countryModel.find();
    res.status(200).json({status:"success",data})
})
// state api
router.get("/states/:name",async(req,res)=>{
    const data = await stateModel.find({country_name:req.params.name});
    res.status(200).json({status:"success",data})
})
// cities api
router.get("/cities/:name",async(req,res)=>{
    const data = await citieModel.find({state_name:req.params.name});
    res.status(200).json({status:"success",data})
})

module.exports = router;