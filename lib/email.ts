// lib/email.ts
import nodemailer from 'nodemailer'

const from = process.env.EMAIL_FROM
const to = process.env.EMAIL_TO
const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS

export async function sendContactEmail(name: string, email: string, message: string) {
  if (!user || !pass || !to || !from) throw new Error('Missing email environment variables')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  })

  await transporter.sendMail({
    from,
    to,
    subject: `New Contact Form Submission from ${name}`,
    text: `
You received a new message from the LD TRUE website:

Name: ${name}
Email: ${email}
Message:
${message}
    `,
  })
}
