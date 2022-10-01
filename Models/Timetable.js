

//No need of this schema

const mongoose = require("mongoose")

const { Schema } = mongoose;


const TimeTableSchema = new Schema({

});

const TimeTable = mongoose.model('timetable', TimeTableSchema);
module.exports = TimeTable;