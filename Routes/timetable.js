const express = require('express')
const router = express.Router()

// const fetchuser = require("../middleware/fetchUser")
// const { body, validationResult } = require('express-validator');  //for validation
const Branch = require("../Models/Branch")
const Teacher = require("../Models/Teacher")
const Subject = require("../Models/Subject")
const Calendar = require("../Models/Calendar")


router.get("/",async(req,res)=>{
    const { sem, branchId,session} = req.body;
    try{
        const timetable = await Calendar.find({sem,branchId,session});
        res.json(timetable)
    }
    catch(err){
        res.json(err)
    }
    
})

router.post("/",async(req,res)=>{
    const {sem,session,branchId,timetable} = req.body
    try{
        const data = await Calendar.find({sem,session,branchId})
        console.log(data);
        if(data.length === 0){
            const entry = new Calendar({
                sem,session,branchId,timetable
            })
            const d = await entry.save()
            console.log(d);
            res.status(200).json("success")
        }else{
            await Calendar.updateOne({sem,session,branchId},{timetable : timetable})
            res.status(200).json("success");
        }
    }
    catch(err){
res.status(500).json(err)
    }
    
})

module.exports = router;  