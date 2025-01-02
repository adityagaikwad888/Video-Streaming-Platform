import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    },
    searchHistory: {
        type: Array,
        default: []
    }
});

const User = mongoose.model("User", userSchema);

export { User }; // We don't used modeule.exports because we are using ES6 module system. We use export instead of module.exports.

