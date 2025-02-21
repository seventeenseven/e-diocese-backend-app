import { HttpError } from '../../../services/error/index.js'
import { sendMail } from '../../../services/mailer/index.js'
import i18n from '../../../services/i18n/index.js'
import ejs from 'ejs'
import { mail } from '../../../config.js'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    ejs.renderFile(process.cwd() + '/src/views/contact.ejs', { firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      message: body.message
    }, function (err, data) {
      if (err) {
        return res.sendHttpError(new HttpError(400, i18n.__('sendEmailConfirmationCodeError')))
      }
      sendMail({
        toEmail: mail.user,
        subject: 'Nouveau message sur les artisans',
        content: data
      })
    })

    return res.json({ success: true })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
