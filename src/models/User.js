//Kullanıcı şeması ve modeli


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // bcryptjs'i dahil et

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    /*role: {
        type: String,
        enum: ['user', 'admin'],  // Sadece 'user' ve 'admin' rolleri kabul edilir
        default: 'user',         // Varsayılan değer 'user'
    },
    */
    
});

// Şifreyi kaydetmeden önce hash'le
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);  // 10 tur salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
