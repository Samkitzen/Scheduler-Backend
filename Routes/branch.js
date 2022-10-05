const express = require('express')
const router = express.Router()

// const fetchuser = require("../middleware/fetchUser")
// const { body, validationResult } = require('express-validator');  //for validation
const Branch = require("../Models/Branch")


//Branches
router.post('/',async(req,res)=>{
    try {
        const { name ,branchCode} = req.body;
        const branch = new Branch({
            name,branchCode
        });
        const savedBranch = await branch.save();
        res.json(savedBranch);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.get('/',async(req,res)=>{
    try {
        const allBranches = await Branch.find({});
        res.json(allBranches);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})


module.exports = router;  