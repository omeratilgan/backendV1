const express = require('express');
const connectDB = require('./database');
const User = require('./models/User'); // User modelini dahil et
const { userSchema } = require('./validation/userValidation'); // Joi şeması dahil et

const app = express();
app.use(express.json());

// Veritabanı bağlantısını başlat
connectDB();

// Kullanıcı ekleme endpoint’i
app.post('/users', async (req, res) => {
    try {
        // Joi validasyonu
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validasyon hatası', error: error.details[0].message });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu', user: newUser });
    } catch (err) {
        res.status(400).json({ message: 'Kullanıcı oluşturulamadı', error: err.message });
    }
});

// Kullanıcıları listeleyen GET endpoint'i
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();  // MongoDB'den tüm kullanıcıları çek
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Kullanıcılar alınırken bir hata oluştu', error: err.message });
    }
});

// Kullanıcı güncelleme endpoint'i
app.put('/users/:id', async (req, res) => {
    try {
        // Joi validasyonu
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validasyon hatası', error: error.details[0].message });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.status(200).json({ message: 'Kullanıcı başarıyla güncellendi', user: updatedUser });
    } catch (err) {
        res.status(400).json({ message: 'Kullanıcı güncellenemedi', error: err.message });
    }
});

// Kullanıcı silme endpoint'i
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.status(200).json({ message: 'Kullanıcı başarıyla silindi' });
    } catch (err) {
        res.status(500).json({ message: 'Kullanıcı silinemedi', error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
