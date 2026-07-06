const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//header security
app.use(helmet());

//Rate limit
const rateLimit = require('express-rate-limit');
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100}));


//connect to mongodb
mongoose.connect( process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

//routes
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);


//test route
app.get('/', (req, res) => {
    res.send('API is running...');
})


//start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});