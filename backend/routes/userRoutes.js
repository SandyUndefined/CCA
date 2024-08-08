const express = require("express");
const { getAllUsers, signUp, deleteAll, getUserProfile, login } = require("../controllers/userController");
const router = express.Router();
const downloadData = require("../controllers/nodemailerController");

//
router.get('/allUsers', getAllUsers);

router.post('/signup', signUp);
router.post('/login', login);
router.get('/',  function (req, res, next) {
    res.send("welcome!")
});

router.delete('/delete', deleteAll)


router.get('/userProfile',getUserProfile);
router.get('/download',downloadData);

module.exports = router;