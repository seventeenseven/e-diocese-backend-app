import { HttpError } from '../../../services/error'
import { sendMail } from '../../../services/mailer'
import i18n from '../../../services/i18n'
import ejs from 'ejs'
import User from '../../../models/user'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const user = await User.findByEmail(body.email)
    if (!user) {
      return res.sendHttpError(new HttpError(404, i18n.__('userNotFound')))
    }
    // if (user && user.emailVerified) {
    //   return res.sendHttpError(new HttpError(400, i18n.__('accountAlreadyVerified')))
    // }

    const code = await user.setEmailVerificationCode()

    ejs.renderFile(process.cwd() + '/src/views/mail-confirmation.ejs', { code: code }, function (err, data) {
      if (err) {
        return res.sendHttpError(new HttpError(400, i18n.__('sendEmailConfirmationCodeError')))
      }
      sendMail({
        toEmail: body.email,
        subject: i18n.__('emailTitleConfirmation'),
        content: data
      })
    })

    return res.json({ success: true })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
