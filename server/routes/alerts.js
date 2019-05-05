const {Alert} = require('../models/alert') ;
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const alerts = await Alert.find();
  res.send(alerts);
});

router.get('/:initialDate/:endDate', async (req, res) => {
  const inital = req.params.initialDate;
  const end = req.params.endDate;
  
  const alerts = await Alert.find({ 'date': {$gte: inital, $lte: end}});
  res.send(alerts);
});

module.exports = router;