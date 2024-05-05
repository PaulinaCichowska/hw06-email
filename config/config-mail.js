import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendVerifyMail = (email) => {
    const msg = {
        from: "misslisiaa@hotmail.com",
        to: "misiaczekspotify@gmail.com",
        subject: "Verify your email",
        html: "<a href=`http://localhost:3000/user/verify/:verificationToken` >Verify you email</a>",
    }
    return sgMail.send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch(error => {
            console.error(error);
        })
} 