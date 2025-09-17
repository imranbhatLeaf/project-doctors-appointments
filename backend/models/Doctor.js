const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  address: String
});
module.exports = mongoose.model('Doctor', DoctorSchema);
