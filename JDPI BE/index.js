require('dotenv').config()
const express= require('express')
const mongoose=require('mongoose')
const authRoutes= require('./routes/AuthRoutes')
const staffRoutes = require('./routes/StaffRoutes')
const attendanceRoutes = require('./routes/AttendanceRoutes')
const expenseRoutes = require('./routes/ExpenseRoutes')
const salesRoutes = require('./routes/SalesRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Application configuration
const port=8080;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))

// Database Configuration
mongoose.connect(process.env.DATABASE_URL)
mongoose.connection.once('connected', ()=> console.log('DATABASE CONNECTED for JDPI'))
mongoose.connection.once('error', (er)=> console.log('DATABASE ERROR: ', er))

// Route Configurations
app.use('/api/v1/auth', authRoutes); //Any api request for auth will go to this file
app.use('/api/v1/staff', staffRoutes);//Any api request for staff management will go to this file
app.use('/api/v1/attendance', attendanceRoutes);//Any api request for attendance will go to this file
app.use('/api/v1/expenses', expenseRoutes);//Any api request for expense trackking and report will go to this file
app.use('/api/v1/sales', salesRoutes);//Any api request for expense trackking and report will go to this file

app.listen(port, ()=> console.log(`App started on port ${port}`));