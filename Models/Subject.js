const mongoose = require("mongoose")

const { Schema } = mongoose;

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code :{
        type:String,
    },
    sem:{
        type:Number,
        required:true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
        required: true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
});

const Subject = mongoose.model('subject',SubjectSchema);
module.exports = Subject;