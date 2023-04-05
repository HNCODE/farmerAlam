const mongoose = require("mongoose")

const farmSchema = new mongoose.Schema({
    rental: String,
    title: String,
    price: String,
    area: String,
    data: String,
    msg: String,
    channel: String,
});

const farmModel = module.exports = mongoose.model("농지은행", farmSchema)
