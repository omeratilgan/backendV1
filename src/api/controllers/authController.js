// src/api/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config();  // .env dosyasını dahil ediyoruz

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login attempt with email:', email); // Debug log

        const user = await User.findOne({ email });
        console.log('Found user:', user); // Debug log

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Şifre doğrulama
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Geçersiz şifre' });
        }

        // JWT oluştur
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Giriş başarılı',
            token,
        });
    } catch (err) {
        console.error('Login error:', err); // Hata loglaması ekleyelim
        res.status(500).json({ message: 'Giriş yapılamadı', error: err.message });
    }
};

module.exports = { login };
