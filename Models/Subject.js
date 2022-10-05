const mongoose = require("mongoose")

const { Schema } = mongoose;

const SubjectSchema = new Schema({
    sem: {
        type: Number,
        required: true
    },
    branchCode: {
        type: String,
        required: true
    },
    subject: [{
        name: {
            type: String,
            required: true
        },
        subjectCode: {
            type: String,
            required: true,
            unique: true
        },
        teacherCode:{
            type:String,
        },
        teacherName:{
            type:String
        }
    }]

});

const Subject = mongoose.model('subject', SubjectSchema);
module.exports = Subject;