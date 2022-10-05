const mongoose = require("mongoose")

const { Schema } = mongoose;

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teacherCode:{
        type:String,
        required:true,
        unique:true
    }
});

const Teacher = mongoose.model('teacher',TeacherSchema);
module.exports = Teacher;