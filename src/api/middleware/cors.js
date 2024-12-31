const cors = require('cors');

const corsOptions = {
    origin: '*', // Tüm kaynaklara izin ver (Üretimde bu ayarı daraltmalısınız)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
