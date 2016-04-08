/**
 * Created by ean.mclaughlin on 4/7/2016.
 */

var mongoose = require("mongoose");
var bluebird = require('bluebird');
mongoose.Promise = bluebird;
var Collections = require("./lib/collection");

var FrontierDB = function (options) {
    mongoose.connect("mongodb://localhost/frontier");

    return {
        getRooms: function (where, select, sensor_select) {
            return Collections.Room.find(where, select).populate('sensors', sensor_select).exec();
        },

        getRoom: function (where, select, sensor_select) {
            return Collections.Room.findOne(where, select).populate('sensors', sensor_select).exec();
        },

        getSensors: function (where, select, populate_select) {
            return Collections.Sensor.find(where, select).populate('room', populate_select).exec();
        },

        getSensor: function (where, select, populate_room) {
            return Collections.Sensor.findOne(where, select).populate('room', populate_room).exec();
        },

        getReadings: function (where, select, room_select, sensor_select) {
            return Collections.Reading.find(where, select).populate('room', room_select).populate('sensor', sensor_select).exec();
        },

        getReading: function (where, select, room_select, sensor_select) {
            return Collections.Reading.findOne(where, select).populate('room', room_select).populate('sensor', sensor_select).exec();
        },
        registerRoom: function (room) {
            return new Collections.Room(room).save();
        },

        registerSensor: function (sensor) {
            return new Collections.Sensor(sensor).save().then(function (sensorDoc) {
                return Collections.Room.findByIdAndUpdate(
                    sensorDoc.room,
                    {$push: {"sensors": sensorDoc._id}},
                    {safe: true, upsert: true}
                ).then(function () {
                    return sensor;
                })
            });
        },

        addReading: function (reading) {
            return new Collections.Reading(reading).save();
        },

        collections: Collections
    };
};

module.exports = FrontierDB;