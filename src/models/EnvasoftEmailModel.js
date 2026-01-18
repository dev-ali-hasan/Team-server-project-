import mongoose from "mongoose";

const EnvaySoftSchema = mongoose.Schema({
    email: {type: String, required: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/},
}, {timestamps: true});

const EnvaySoftModel = mongoose.model('envaysoft-email', EnvaySoftSchema)

export default EnvaySoftModel;
