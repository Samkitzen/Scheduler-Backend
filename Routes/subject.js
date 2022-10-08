const express = require('express')
const router = express.Router()

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

router.get('/:sem/:branchcode', async (req, res) => {
    try {
        var allSubjects = await Subject.find({branchCode : req.params.branchcode,sem: req.params.sem});
        console.log(allSubjects);
        res.json(allSubjects[0].subject);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})


module.exports = router;  