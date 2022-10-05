const express = require('express')
const router = express.Router()

// const fetchuser = require("../middleware/fetchUser")
// const { body, validationResult } = require('express-validator');  //for validation
const Teacher = require("../Models/Teacher")

//Teachers
router.post('/',async(req,res)=>{
    try {
        const { name,teacherCode } = req.body;
        const teacher = new Teacher({
            name,teacherCode
        });
        const savedTeacher = await teacher.save();
        res.json(savedTeacher);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.get('/',async(req,res)=>{
    try {
        const allTeachers = await Teacher.find({});
        res.json(allTeachers);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})



module.exports = router;  