const {Alert} = require('../models/alert') ;
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const alerts = await Alert.find();
  res.send(alerts);
});

module.exports = router;