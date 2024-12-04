//Veritabanı bağlantısı


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB bağlantısı başarılı!');
    } catch (err) {
        console.error('MongoDB bağlantı hatası:', err.message);
        process.exit(1); // Hata durumunda uygulamayı sonlandır
    }
};

module.exports = connectDB;

