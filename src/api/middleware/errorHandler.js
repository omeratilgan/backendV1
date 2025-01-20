// Merkezi hata yönetimi middleware'i
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Validasyon hatası',
            details: err.message
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Geçersiz token'
        });
    }

    // Varsayılan hata yanıtı
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Sunucu hatası'
    });
};

module.exports = errorHandler;