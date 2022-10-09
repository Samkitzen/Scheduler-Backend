const express = require('express')
const router = express.Router()
const authRole = require("../middleware/authRole")
const ROLE = require('../Models/Role')
const fetchuser = require("../middleware/fetchUser")
const Subject = require("../Models/Subject")


//Subjects
router.post('/',fetchuser,authRole(ROLE.ADMIN), async (req, res) => {
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

router.get('/:sem/:branchcode', async (req, res) => {
    try {
        var allSubjects = await Subject.find({branchCode : req.params.branchcode,sem: req.params.sem});
        res.json(allSubjects[0].subject);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})


module.exports = router;  