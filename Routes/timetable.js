const express = require('express')
const router = express.Router()

const Calendar = require("../Models/Calendar")


router.get("/:sem/:branchCode", async (req, res) => {
    const { sem, branchCode } = req.params
    try {
        const data = await Calendar.find({ sem, branchCode });
        res.json(data[0].timetable)
    }
    catch (err) {
        res.json(err)
    }

})
router.put("/", async (req, res) => {
    const { sem, branchCode, day, time, subjectCode } = req.body

    try {
        // const query = { [`${day}.${time}`]: { subjectCode:subjectCode, bit:0 } };
        // await Calendar.updateOne({sem,branchCode}, query)
        // res.status(200).json("success");
        const data = await Calendar.find({ sem, branchCode, day, time, subjectCode })
        if (data.length === 0) {
            throw "!Not Found"
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

router.post("/", async (req, res) => {
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