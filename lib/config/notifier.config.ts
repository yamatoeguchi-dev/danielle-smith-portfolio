export const notifierConfig ={
    recipients: [
        'yamatoe1227@gmail.com',
    ],
    GMAIL: {
        smtpServer: "smtp.gmail.com",
        smtpPort: 587,
        fromEmail: "dan.e.blast1227@gmail.com",
        googleAppPassword: `${process.env.GOOGLE_APP_PASSWORD}`,
    }
}