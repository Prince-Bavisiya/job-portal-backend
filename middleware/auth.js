const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    try {

        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

const isAdmin = (req, res, next) => {

    if (req.user.role === "admin") {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: "Admin Access Only"
        });
    }

};

module.exports = {               //auth function le jao, isAdmin function le jao
    auth,
    isAdmin
};