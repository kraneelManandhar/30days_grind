const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mydarling3547@gmail.com',
        pass: 'yfra torv ctqw khlw'
    }
});

const mailOptions = {
    from: 'mydarling3547@gmail.com',
    to: 'sakshamrajkarnikar4@gmail.com',
    subject: 'Test Email from NodeMailer',
    text: 'Hello nigga, this is a test email from njgga_seller_69 in your mac!'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred: ', error);
    } else {
        console.log('Email sent: ', info.response);
    }
});
