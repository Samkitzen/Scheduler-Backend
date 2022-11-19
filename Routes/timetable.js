const express = require('express')
const router = express.Router()
const authRole = require("../middleware/authRole")
const ROLE = require('../Models/Role')
const fetchuser = require("../middleware/fetchUser")
const Calendar = require("../Models/Calendar")


router.get("/:sem/:branchCode", async (req, res) => {
    const { sem, branchCode } = req.params
    try {
        const data = await Calendar.findOne({ sem, branchCode });
        res.json(data.timetable)
    }
    catch (err) {
        res.json(err)
    }
})

//only admin can change these all routes
router.put("/",fetchuser,authRole(ROLE.ADMIN), async (req, res) => {
    const { sem, branchCode, day, time, subjectCode } = req.body
    try {
        const data = await Calendar.findOne({ sem, branchCode })
        if (data === null) {
            throw "!Not Found"
        } else {
            var tt = data.timetable
            tt[day][time].subjectCode = subjectCode;
            await Calendar.updateOne({ sem, branchCode }, { timetable: tt })
            res.status(200).json("success");
        }
    }
    catch (err) {
        console.log((err));
        res.status(500).json(err)
    }
})

router.post("/",fetchuser,authRole(ROLE.ADMIN), async (req, res) => {
    const { sem, branchCode, day, time, subjectCode } = req.body
    console.log(req.body);
    try {
        const data = await Calendar.find({ sem, branchCode, day, time, subjectCode })
        if (data.length === 0) {
            const timetable = {
                [day]: {
                    [time]: { subjectCode: subjectCode }
                }
            }
            const entry = new Calendar({
                sem, branchCode, timetable
            })
            const d = await entry.save()
            res.status(200).json(d)
        } else {
            var tt = data[0].timetable
            tt[day.toString()][time.toString()].subjectCode = subjectCode;
            await Calendar.updateOne({ sem, branchCode }, { timetable: tt })
            res.status(200).json("success");
        }
    }
    catch (err) {
        console.log((err));
        res.status(500).json(err)
    }

})

module.exports = router;  