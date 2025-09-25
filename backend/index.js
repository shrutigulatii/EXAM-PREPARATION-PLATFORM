const express = require('express');
const cors = require('cors');

// const { PrismaClient } = require('@prisma/client');

const { PrismaClient } = require('./generated/prisma');

const app = express();
const prisma = new PrismaClient();

const PORT = 5000;

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('ExamPrep App Backend is running!');
});

//auth routes
const authRoute = require('./routes/authRoute.js');
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});