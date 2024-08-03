const express = require('express');
const { getData, addData, deleteData, filterDataByTimeRange, getLatestActuator} = require('../controllers/sensorController');
const { checkDataAccess } = require('../controllers/userController');
const router = express.Router();

router.get('/:plantId/data', getData); // Route with the plant ID parameter
router.post('/:plantId/addData', addData); // Route with the plant ID parameter
router.delete('/:plantId/delData', deleteData); // Route with the plant ID parameter
router.get('/:plantId/filter', filterDataByTimeRange); // Route with the plant ID parameter
router.get('/:plantId/getAct',getLatestActuator);
module.exports = router;
