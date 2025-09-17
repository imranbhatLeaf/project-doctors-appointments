const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { recommend } = require('../recommendation');

router.get('/', async (req,res)=>{
  const docs = await Doctor.find();
  res.json(docs);
});

router.post('/recommend', async (req,res)=>{
  const { symptoms } = req.body;
  const spec = recommend(symptoms);
  const docs = await Doctor.find({ specialization: spec });
  res.json({ specialization: spec, doctors: docs });
});

module.exports = router;
