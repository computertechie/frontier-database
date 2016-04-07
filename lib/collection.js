/**
 * Created by ean.mclaughlin on 4/7/2016.
 */

var mongoose = require("mongoose");

module.exports = {
    Room: mongoose.model("Room", mongoose.Schema({
        name: String,
        description: String
    })),

    Sensor: mongoose.model("Sensor", mongoose.Schema({
        name: String,
        description: String,
        room: mongoose.SchemaType.ObjectId,
        type: String
    })),

    Reading: mongoose.model("Reading", mongoose.Schema({
        sensor: mongoose.SchemaType.ObjectId,
        value: Number,
        timestamp: Date
    }))
};

