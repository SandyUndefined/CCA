const express = require("express");
const { getAllUsers, signUp, deleteAll, protectRoute, getUserProfile, login } = require("../controllers/userController");
const router = express.Router();
const passport = require('passport');
const { signin, signinCallback, dashboard } = require("../controllers/googleAuthController");
const downloadData = require("../controllers/nodemailerController");

//
router.get('/allUsers', getAllUsers);

//
router.post('/signup', signUp);
router.post('/login', login);
router.get('/',  function (req, res, next) {
    res.send("welcome!")
});

router.delete('/delete', deleteAll)



// Set up Express routes
router.get('/auth/google', signin);
router.get('/auth/google/callback', signinCallback, dashboard);



router.use(protectRoute)
router.get('/userProfile',getUserProfile);
router.get('/download',downloadData);

module.exports = router;