/* eslint-disable no-unused-vars */
import nodemailer from 'nodemailer'
import { mail, sendgrid, mailConfigs } from '~/config'

// const sgMail = require('@sendgrid/mail')

// sgMail.setApiKey(sendgrid.apiKey)

const transporter = nodemailer.createTransport({
  service: 'smtp',
  host: mailConfigs.host,
  auth: mail,
  port: mailConfigs.port,
  secure: true
})

export const sendMail = ({
  toEmail,
  subject,
  content
}) => new Promise((resolve, reject) => {
  transporter.sendMail({ // sgMail.send
    from: 'contact@lesartisans.ci',
    to: toEmail,
    subject: subject,
    html: content
  }, (err, info) => {
    if (err) {
      return reject(err)
    }

    return resolve(info)
  })
})
