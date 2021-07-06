const router = require("express").Router();
const { models: { User }, } = require('../db')

router.get("/me", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: {
                usernameEmail: username,
                password: password,
            }
        })
        console.log(user)
        res.send(user);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;