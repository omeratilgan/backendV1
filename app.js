const express = require('express');
const authRoutes = require('./src/api/routes/auth');
const userRoutes = require('./src/api/routes/users');
const connectDB = require('./database');
const corsMiddleware = require('./src/api/middleware/cors');
const errorHandler = require('./src/api/middleware/errorHandler');
require('dotenv').config();


connectDB();

const app = express();

// Middleware'ler
app.use(corsMiddleware());
app.use(express.json());

// Rotalar
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Hata yönetimi middleware'i - tüm rotalardan sonra eklenmelidir
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Sayfa bulunamadı' });
});

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});