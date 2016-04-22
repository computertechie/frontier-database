/**
 * Created by ean.mclaughlin on 4/7/2016.
 */

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = {
    Room: mongoose.model("Room", Schema({
        name: String,
        description: String,
        sensors: [{type: String, ref: 'Sensor'}]
    })),

    Sensor: mongoose.model("Sensor", Schema({
        _id: String,
        name: String,
        description: String,
        room: {type: ObjectId, ref: 'Room'},
        type: String
    })),

    Reading: mongoose.model("Reading", Schema({
        sensor: {type: String, ref: 'Sensor'},
        room: {type: ObjectId, ref: 'Room'},
        value: Number,
        timestamp: Date
    }))
};

