import mongoose from "mongoose";

const QuickQuestionSchema = mongoose.Schema({
    country: {type: String, required: true},
    framework: {type: String, required: true},
    email: {type: String, required: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/},
    ip: {type: String, required: true, unique: true}
}, {timestamps: true});

const QuickQuestionModel = mongoose.model('fleetcart', QuickQuestionSchema)

export default QuickQuestionModel;
