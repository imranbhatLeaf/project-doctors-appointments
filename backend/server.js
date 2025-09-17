require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./db');

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const apptRoutes = require('./routes/appointments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', apptRoutes);

const PORT = 5000;
(async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/doctor_app_quick');
    app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
  } catch (e) {
    console.error(e);
  }
})();
