const mongoose = require("mongoose")

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4

    },
    lastName: {
        type: String,
        required: true,
        minLength: 4
    },
    email: {

        type: String,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        default: "Google_SignIn"
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        default: "Google_SignIn",
        validate: {
            validator: function (confirmPassword) {
                return confirmPassword === this.password;
            },
            message: "Passwords do not match"
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'other'],
        default: 'user'
    },
    accountType: {
        type: String,
        default: 'other',
    },
    organizationName: {
        type: String,
        default : "Google_SignIn",
        required: true
    },
    dataAccess: {
        type: Boolean,
        default: true
    }

}
)

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel