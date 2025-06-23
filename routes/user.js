const express = require("express")
const router = express.Router()
const {handleUserSignin, handleUserSignup, userLogout} = require("../controllers/user")

router.get("/signup", (req, res)=>{
    return res.render("signup")
})

router.get("/signin", (req, res)=>{
    return res.render("signin")
})

router.get("/logout", userLogout)
router.post("/signup", handleUserSignup)
router.post("/signin", handleUserSignin)

module.exports = router

