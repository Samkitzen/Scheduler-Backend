const mongoose = require("mongoose")

const { Schema } = mongoose;


const cellSchema = new Schema({
    time: {
        type: Number,
        required: true
    },
    subjectCode:{
        type:String,
        required:true,
    }
})
const CalenderSchema = new Schema({
    session: {
        type: Number,
        required: true
    },
    sem: {
        type: Number,
        required: true
    },
    branchCode: {
        type: String,
        required: true
    },
    timetable: {
        Monday: [cellSchema],
        Tuesday: [cellSchema],
        Wednesday: [cellSchema],
        Thursday: [cellSchema],
        Friday: [cellSchema],
        Saturday: [cellSchema],
    },
    date: {
        type: Date,
        default: Date.now
    },

});

const Calendar = mongoose.model('calendar', CalenderSchema);
module.exports = Calendar;