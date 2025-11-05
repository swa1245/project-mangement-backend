import { userModel } from "../models/user.models.js";
import { ApiResponse } from "../services/api-response.js";
import ApiError from "../services/api-error.js";
import { asyncHandler } from "../services/async-handler.js";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateTemporaryToken from "../models/user.models.js";

import { sendEmail } from "../services/mail.js";

export const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refereshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, username, password, role } = req.body;
    if (!firstName || !lastName || !email || !password || !username) {
      throw new ApiError(400, "All fields are required");
    }
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      username,
      password: hashPassword,
      role,
      isEmailVerfied: false,
    });

    const { unhashedToken, hashedToken, tokenExpiry } =
      generateTemporaryToken(newUser);
    newUser.emailVerificationToken = hashedToken;
    newUser.emailVerificationExpiry = tokenExpiry;
    await newUser.save({ validateBeforeSave: false });

    await sendEmail({
      email: newUser?.email,
      subject: "Verify your email",
      mailgenContent: emailVerificationMailgenContent(
        newUser.username,
        `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email?token=${unhashedToken}`
      ),
    });

    const createdUser = await newUser.findById(newUser._id).select(
        "-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry"
    );
    if (!createdUser) {
      throw new ApiError(500, "User creation failed");
    }
    return res
      .status(201)
      .json(
        new ApiResponse(201, "User registered successfully", createdUser)
      );
  },
);
