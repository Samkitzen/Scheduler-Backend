const express = require('express')
const router = express.Router()

// const fetchuser = require("../middleware/fetchUser")
// const { body, validationResult } = require('express-validator');  //for validation
const Branch = require("../Models/Branch")
const Teacher = require("../Models/Teacher")
const Subject = require("../Models/Subject")


//Branches
router.post('/', async (req, res) => {
    try {
        const { sem,branchCode,subject } = req.body;
        const newSub = new Subject({
            sem, branchCode,subject
        });
        const savedSubject = await newSub.save();
        res.json(savedSubject);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.get('/:branchid/:sem', async (req, res) => {
    try {
        var allSubjects = await Subject.find({branch : req.params.branchid,sem: req.params.sem});

        allSubjects.forEach(async (s,i) =>{
            s["branchName"] = await Branch.findById(s.branch).name
            s["teacherName"] = await Teacher.findById(s.teacher).name
            
            console.log(allSubjects[i]);
            return s;
        })
        res.json(allSubjects);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})


module.exports = router;  