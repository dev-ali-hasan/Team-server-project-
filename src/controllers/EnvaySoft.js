import EnvaySoftModel from "../models/EnvasoftEmailModel.js";

export const postEnvaySoft = async (req, res) => {
    try {
        const exists = await EnvaySoftModel.findOne(req.body);
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }
        await EnvaySoftModel.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Email submitted successfully"
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = {};

            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
export const getEnvaySoft = async (req, res) => {
    const result = await EnvaySoftModel.find();
    res.send(result);
};