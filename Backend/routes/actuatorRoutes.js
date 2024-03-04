const express = require("express");
const { getValue, updateValue } = require("../controllers/actuatorControllers");
const router = express.Router();

router.get('/getvalues/:plantName?', getValue);
router.patch('/updateValues/:plantName', updateValue);

module.exports = router;
