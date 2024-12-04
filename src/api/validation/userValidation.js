const Joi = require('joi');

// Kullanıcı oluşturma için Joi validasyon şeması
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'İsim boş olamaz.',
        'string.min': 'İsim en az 3 karakter olmalıdır.',
        'string.max': 'İsim en fazla 30 karakter olabilir.',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email boş olamaz.',
        'string.email': 'Geçerli bir email adresi giriniz.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Şifre boş olamaz.',
        'string.min': 'Şifre en az 6 karakter olmalıdır.',
    }),
});

module.exports = {
    userSchema,
};
