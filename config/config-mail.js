import ejs from 'ejs'
import sgMail from '@sendgrid/mail'
import { promises as fs } from 'fs';
import path from "path";

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const htmlTemplatePath = path.join(process.cwd(), 'views/emailTemplate.ejs');


export const sendVerifyMail = async (email, token) => {
    const template = await fs.readFile(htmlTemplatePath, 'utf-8');
    const html = await ejs.render(template, { email, token });
    console.log(html)
    const msg = {
        from: "misslisiaa@hotmail.com",
        to: email,
        subject: "Verify your email",
        html,
    }
    return sgMail.send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch(error => {
            console.error(error);
        })
} 