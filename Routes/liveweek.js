const express = require('express')
const router = express.Router()
const authRole = require("../middleware/authRole")
const ROLE = require('../Models/Role')
const fetchuser = require("../middleware/fetchUser")
const Calendar = require("../Models/Calendar")
const LiveWeek = require("../Models/LiveWeek")


router.get("/:sem/:branchCode", async (req, res) => {
    const { sem, branchCode } = req.params
    try {
        const data = await LiveWeek.findOne({ sem, branchCode });
        res.json(data.timetable)
    }
    catch (err) {
        res.json(err)
    }
})

//put request to reschedule a lecture

router.put("/reschedule",fetchuser,authRole(ROLE.CR), async (req, res) => {
    const { sem, branchCode, day, time, subjectCode } = req.body
    try {
        const data = await LiveWeek.findOne({ sem, branchCode })
        if (data === null) {
            throw "!Not Found"
        } else {
            var tt = data.timetable
            tt[day][time]['rSubjectCode'] = subjectCode;
            tt[day][time].bit = 3
            await LiveWeek.updateOne({ sem, branchCode }, { timetable: tt })
            res.status(200).json("success");
        }
    }
    catch (err) {
        console.log((err));
        res.status(500).json(err)
    }
})

//put request to cancel a lecture

router.put("/cancel",fetchuser,authRole(ROLE.CR), async (req, res) => {
    const { sem, branchCode, day, time} = req.body
    try {
        const data = await LiveWeek.findOne({ sem, branchCode })
        if (data === null) {
            throw "!Not Found"
        } else {
            var tt = data.timetable
            //cancelling by setting bit to 2
            tt[day][time].bit = 2;
            await LiveWeek.updateOne({ sem, branchCode }, { timetable: tt })
            res.status(200).json("success");
        }
    }
    catch (err) {
        console.log((err));
        res.status(500).json(err)
    }
})

//put request to mark a lecture done

router.put("/done",fetchuser,authRole(ROLE.CR), async (req, res) => {
    const { sem, branchCode, day, time} = req.body
    try {
        const data = await LiveWeek.findOne({ sem, branchCode })
        if (data === null) {
            throw "!Not Found"
        } else {
            var tt = data.timetable
            //cancelling by setting bit to 2
            tt[day][time].bit = 1;
            await LiveWeek.updateOne({ sem, branchCode }, { timetable: tt })
            res.status(200).json("success");
        }
    }
    catch (err) {
        console.log((err));
        res.status(500).json(err)
    }
})

//put request to reset to default

router.put("/reset",fetchuser,authRole(ROLE.CR), async (req, res) => {
    const { sem, branchCode, day, time} = req.body
    try {
        const data = await LiveWeek.findOne({ sem, branchCode })
        if (data === null) {
            throw "!Not Found"
        } else {
            var tt = data.timetable
            //cancelling by setting bit to 2
            tt[day][time].bit = 0;
            tt[day][time].rSubjectCode = "";
            await LiveWeek.updateOne({ sem, branchCode }, { timetable: tt })
            res.status(200).json("success");
        }
    }
    catch (err) {
        console.log((err));
        res.status(500).json(err)
    }
})


module.exports = router;  