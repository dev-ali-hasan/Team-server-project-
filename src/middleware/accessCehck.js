import dotenv from "dotenv";

dotenv.config();

const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY;

const AccessChekc = (req, res, next) => {
    const { access } = req.query;

    if (access !== ADMIN_ACCESS_KEY) {
        return res.status(403).json({
            success: false,
            message: "Access denied. Invalid access key."
        });
    }
    next();
};

export default AccessChekc;