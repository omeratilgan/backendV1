const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Bearer token'ı ayıralım

    if (!token) {
        return res.status(401).json({ message: 'Token bulunamadı, lütfen giriş yapın' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Gizli anahtar çevresel değişkenden alınır
        req.user = decoded;  // Kullanıcı bilgisini req.user olarak ekleyelim
        next();  // İstek devam eder
    } catch (err) {
        res.status(401).json({ message: 'Token geçersiz veya süresi dolmuş' });
    }
};

module.exports = jwtAuth;
