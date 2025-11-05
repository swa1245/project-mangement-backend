// mail gen is used to generate an email

import Mailgen from "mailgen";
import nodemailer from "nodemailer"

export const emailVerfictaion = (username: string, verficationUrl: string) => {
  return {
    body: {
      name: username,
      intro: "welocme to our world",
      action: {
        instructions: "to verify emial please click on this button",
        button: {
          color: "#f5ca0cff",
          text: "Verfiy email",
          link: verficationUrl,
        },
      },
      outro:"need help or have questions just reply to these email "
    },
  };
};


export const forgotPassowrdemailVerfictaion = (username: string, resetPasswordUrl: string) => {
  return {
    body: {
      name: username,
      intro: "we got request to reset password ",
      action: {
        instructions: "to reset passowrd please click on this button",
        button: {
          color: "#79e713e7",
          text: "Reset password",
          link: resetPasswordUrl,
        },
      },
      outro:"need help or have questions just reply to these email "
    },
  };
};


//  for sending mail u can use aws ses or brevo for prodcution env
//  for testing u can use mailtrap

export const sendEmail = async (options)=>{
  const mailGenerator = new Mailgen({
    theme:"default",
    product:{
      name:"Task manager",
      link:"https://taskmanagerlink.com"
    }
  })
  const emailText = mailGenerator.generatePlaintext(options.mailgenContent)
  const emailHtml = mailGenerator.generate(options.mailgenContent)

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST as string,
    port: Number(process.env.MAILTRAP_SMTP_PORT),
    auth:{
      user: process.env.MAILTRAP_SMTP_USER as string,
      pass: process.env.MAILTRAP_SMTP_PASS as string
    }
  })

  const mail ={
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml
  }
  try {
    await transporter.sendMail(mail)
  } catch (error) {
    console.error("Error sending email:", error)
  }
}

