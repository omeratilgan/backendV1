const express = require('express');
const authRoutes = require('./src/api/routes/auth');
const userRoutes = require('./src/api/routes/users');
const connectDB = require('./database');
const app = express();
require('dotenv').config();  // .env dosyasını yükler


app.use(express.json()); // JSON verilerini parse etmek için

// Veritabanı bağlantısını başlat
connectDB();

// Rotalar
app.use('/auth', authRoutes);  // Auth rotalarını kullan
app.use('/users', userRoutes); // Kullanıcı işlemleri rotalarını kullan

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
