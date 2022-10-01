const express = require('express')
const router = express.Router()
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

router.post("/", async (req, res) => {
    const user = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        disabled: false
    })
    res.json(user)
})


module.exports = router;  