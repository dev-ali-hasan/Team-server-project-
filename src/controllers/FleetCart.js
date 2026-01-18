import QuickQuestionModel from "../models/FleetCartModel.js";  // Correct import path
import verifyRecaptcha from "../utils/verifyRecaptcha.js";
import countries from "../countries/countries.js";

export const postQuickQuestionFleetCart = async (req, res) => {
    try {
        const {token, framework, email, country_code} = req.body;

        const isRecaptchaValid = await verifyRecaptcha(token);

        if (!isRecaptchaValid.success) {
            return res.status(400).json({success: false, message: 'Invalid reCAPTCHA'});
        }

        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const existingEntry = await QuickQuestionModel.findOne({ ip: ipAddress });
        if (existingEntry) {
            return res.status(400).json({
                success: false,
                message: 'You have already submitted a question from this IP address.'
            });
        }

        await QuickQuestionModel.create({
            framework,
            email,
            country: countries[country_code.toUpperCase()] || country_code,
            ip: ipAddress
        })

        res.status(200).json({success: true, message: 'Quick question submitted successfully!'});

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
export const getQuickQuestionFleetCart = async (req, res) => {
    const result = await QuickQuestionModel.find();
    res.send(result);
};

export const getFrameworkFleetCart = async (req, res) => {
    try {
        const result = await QuickQuestionModel.aggregate([
            {
                $group: {
                    _id: "$framework",
                    count: {$sum: 1}
                }
            },
            {
                $sort: {count: -1}
            }
        ]);
        res.status(200).json({success: true, data: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};
