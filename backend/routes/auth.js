const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "quicksecret";

// register
router.post('/register', async (req,res)=>{
  const { name,email,password } = req.body;
  const hashed = await bcrypt.hash(password,10);
  const user = new User({ name,email,password:hashed });
  await user.save();
  res.json({ ok:true });
});

// login
router.post('/login', async (req,res)=>{
  const { email,password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.json({ ok:false, error:'User not found' });
  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.json({ ok:false, error:'Wrong password' });
  const token = jwt.sign({ id:user._id }, SECRET);
  res.json({ ok:true, token });
});

module.exports = router;
