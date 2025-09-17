const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Appointment = require('../models/Appointment');
const SECRET = "quicksecret";

function auth(req,res,next){
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) return res.json({ ok:false, error:"No token" });
  try {
    req.user = jwt.verify(token,SECRET);
    next();
  } catch(e){ res.json({ ok:false, error:"Invalid token" }); }
}

router.post('/', auth, async (req,res)=>{
  const { doctorId, datetime } = req.body;
  const appt = new Appointment({ patient:req.user.id, doctor:doctorId, datetime });
  await appt.save();
  res.json({ ok:true });
});

router.get('/', auth, async (req,res)=>{
  const appts = await Appointment.find({ patient:req.user.id }).populate('doctor');
  res.json(appts);
});

module.exports = router;
