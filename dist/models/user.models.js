import mongoose, { Document, Schema } from "mongoose";
import jwt, {} from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    username: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    isEmailVerfied: {
        type: Boolean,
        default: false,
    },
    refereshToken: {
        type: String,
    },
    avatar: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: `https://placeholder.co/200x200`,
            localPath: "",
        },
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPassowrdExpiry: {
        type: Date,
    },
    emailVerficationToken: {
        type: String,
    },
    emailVerficationExpiry: {
        type: String,
    },
}, {
    timestamps: true,
});
userSchema.methods.generateAcessToken = function () {
    jwt.sign({
        _id: this._id.toString(),
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};
userSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        _id: this._id.toString(),
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};
userSchema.methods.generateTemproaryToken = function () {
    const unhasedToken = crypto.randomBytes(20).toString("hex");
    const hasedToken = crypto
        .createHash("sha256")
        .update(unhasedToken)
        .digest("hex");
    const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 mins
    return { unhasedToken, hasedToken, tokenExpiry };
};
export const userModel = mongoose.model("User", userSchema);
//# sourceMappingURL=user.models.js.map