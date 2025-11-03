import mongoose, { Document, Schema } from "mongoose";
import jwt, { type JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
interface user {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: {
    url: string;
    localPath: string;
  };
  username: string;
  isEmailVerfied: Boolean;
  refereshToken: String;
  forgotPasswordToken: String;
  forgotPassowrdExpiry: Date;
  emailVerficationToken: String;
  emailVerficationExpiry: String;
}
interface JWTPayload {
  id: string;
}

const userSchema = new Schema<user>(
  {
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
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateAcessToken = function () {
  jwt.sign(
    {
      _id: this._id.toString(),
    } as JwtPayload,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string },
  );
};

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id.toString(),
    } as JwtPayload,
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string },
  );
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
export const userModel = mongoose.model<user>("User", userSchema);
