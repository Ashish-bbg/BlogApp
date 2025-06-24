const { User } = require("../model/user");

async function handleUserSignup(req, res) {
    const { fullName, email, password } = req.body
    if (!fullName || !email || !password) {
        return res.status(400).render("signup", {
            err: "❌ All fields are required."
        })
    }

    await User.create({
        fullName,
        email,
        password,
    })
    const token = await User.matchPasswordAndGenerateToken(email, password)
    res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        sameSite: "strict"
    })
    // console.log("User Signup successfully..");
    req.session.msg = "Login Automatically..."
    return res.redirect("/")
}

async function handleUserSignin(req, res) {
    const { email, password } = req.body
    // console.log("User Signin Successfully..");
    if (!email || !password) {
        return res.status(400).render("signin", {
            err: "❌ All fields are required."

        })
    }
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            sameSite: "strict"
        })
        return res.redirect("/")

    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password",
        })
    }
}

function userLogout(req, res) {
    if (req.cookies?.token) {
        res.clearCookie("token", {
            httpOnly: true,
            // secure: true,
            sameSite: "strict"
        })
        req.session.msg = "Logout Successfully..."
    } else {
        req.session.msg = "Already Logout..."

    }
    return res.redirect("/")
}

module.exports = {
    handleUserSignin,
    handleUserSignup,
    userLogout,
}