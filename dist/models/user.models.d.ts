import mongoose from "mongoose";
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
export declare const userModel: mongoose.Model<user, {}, {}, {}, mongoose.Document<unknown, {}, user, {}, {}> & user & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=user.models.d.ts.map