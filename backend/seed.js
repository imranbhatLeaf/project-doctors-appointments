const connect = require('./db');
const Doctor = require('./models/Doctor');

(async ()=>{
  await connect('mongodb://127.0.0.1:27017/doctor_app_quick');
  await Doctor.deleteMany({});
  await Doctor.insertMany([
    { name:'Dr. Aijaz Ahmad', specialization:'Cardiologist', address:'Srinagar Medical Center' },
    { name:'Dr. Shazia Bano', specialization:'Dermatologist', address:'Lal Chowk Clinic' },
    { name:'Dr. Imtiaz Khan', specialization:'General Physician', address:'Bemina Health' }
  ]);
  console.log("Seeded doctors");
  process.exit();
})();
