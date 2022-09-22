const mongoose = require("mongoose")


const countrySchema = new mongoose.Schema({
   
    name: { type: String }
})
const stateSchema = new mongoose.Schema({
    name: { type: String },
    country_name: {
        type: String
    }
})
const citieSchema = new mongoose.Schema({
    name: { type: String },
    state_name: {
        type: String
    }
})

const countryModel = mongoose.model("countrie",countrySchema)
const stateModel = mongoose.model("state",stateSchema)
const citieModel = mongoose.model("citie",citieSchema)

module.exports = {
    countryModel,
    stateModel,
    citieModel
}