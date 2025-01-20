const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: 'Validasyon hatası',
                details: error.details[0].message
            });
        }
        next();
    };
};

module.exports = validateRequest;