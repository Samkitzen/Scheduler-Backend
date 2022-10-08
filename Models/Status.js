const mongoose = require("mongoose")

const { Schema } = mongoose;

const StatusSchema = new Schema({
    date: String,
    lectures:[{
        subjectCode: String,
        count: Number
    }]

});


const Status = mongoose.model('status',StatusSchema);
module.exports = Status;