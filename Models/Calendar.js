const mongoose = require("mongoose")

const { Schema } = mongoose;


const cellSchema = new Schema({
    time: {
        type: Number,
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true
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
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
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