//Veritabanı bağlantısı


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydb');
        console.log('MongoDB bağlantısı başarılı!');
    } catch (err) {
        console.error('MongoDB bağlantı hatası:', err.message);
        process.exit(1); // Hata durumunda uygulamayı sonlandır
    }
};

module.exports = connectDB;


/*
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // MongoDB bağlantı seçenekleri
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı!');
    } catch (err) {
        console.error('MongoDB bağlantı hatası:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
*/