const cors = require('cors');

const corsOptions = {
    origin: function (origin, callback) {
        // Mobil uygulamalar için null origin'e izin ver
        if (!origin) {
            return callback(null, true);
        }
        
        const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true); // Geliştirme aşamasında tüm originlere izin ver
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Cookie kullanımı için gerekli
    maxAge: 86400, // CORS önbellek süresi (24 saat)
    optionsSuccessStatus: 200
};

module.exports = () => cors(corsOptions);