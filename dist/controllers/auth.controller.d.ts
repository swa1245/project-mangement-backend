import type { Request, Response } from "express";
export declare const generateAccessAndRefreshToken: (userId: string) => Promise<{
    accessToken: any;
    refreshToken: any;
}>;
export declare const registerUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=auth.controller.d.ts.map