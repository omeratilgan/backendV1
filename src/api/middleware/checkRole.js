module.exports = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;  // Token'dan gelen rol

        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Bu işlemi gerçekleştirme yetkiniz yok' });
        }

        next();
    };
};
