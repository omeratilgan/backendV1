const cors = require('cors');

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
        
        // origin null olabilir (örn: Postman kullanırken)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy violation'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Cookie kullanımı için gerekli
    maxAge: 86400 // CORS önbellek süresi (24 saat)
};

module.exports = () => cors(corsOptions);