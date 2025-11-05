export declare const emailVerfictaion: (username: string, verficationUrl: string) => {
    body: {
        name: string;
        intro: string;
        action: {
            instructions: string;
            button: {
                color: string;
                text: string;
                link: string;
            };
        };
        outro: string;
    };
};
export declare const forgotPassowrdemailVerfictaion: (username: string, resetPasswordUrl: string) => {
    body: {
        name: string;
        intro: string;
        action: {
            instructions: string;
            button: {
                color: string;
                text: string;
                link: string;
            };
        };
        outro: string;
    };
};
export declare const sendEmail: (options: any) => Promise<void>;
//# sourceMappingURL=mail.d.ts.map