/**
 * Created by ean.mclaughlin on 4/7/2016.
 */

var mongoose = require("mongoose");
var Collections = require("./lib/Collections");

var FrontierDB = function (options) {
    mongoose.connect("mongodb://localhost/frontier");

    return Collections;
};


module.exports.FrontierDB = FrontierDB;
module.exports.collections = Collections;