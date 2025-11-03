import { ApiResponse } from "../services/api-response.js";
import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../services/async-handler.js";

// frst way
// export const healthCheck = async (req: Request, res: Response,next:NextFunction) => {
//   try {
//     res.status(200).json(new ApiResponse(200, { message: "sever is running" }));
//   } catch (error) {
//     next(error)
//   }
// };
export const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "sever is running" }));
});
