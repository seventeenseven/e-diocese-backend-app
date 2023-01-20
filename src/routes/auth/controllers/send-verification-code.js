import { HttpError } from '~/services/error'
import i18n from '~/services/i18n'
import User from '~/models/user'
import { sendCode } from '../../../services/orangeKotaci'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const user = await User.findByPhone(body.phone)
    if (!user) {
      return res.sendHttpError(new HttpError(404, i18n.__('userNotFound')))
    }
    // if (user && user.emailVerified) {
    //   return res.sendHttpError(new HttpError(400, i18n.__('accountAlreadyVerified')))
    // }

    const code = await user.setPhoneVerificationCode()

    // ejs.renderFile(process.cwd() + '/src/views/mail-confirmation.ejs', { code: code }, function (err, data) {
    //   if (err) {
    //     return res.sendHttpError(new HttpError(400, i18n.__('sendEmailConfirmationCodeError')))
    //   }
    //   sendMail({
    //     toEmail: body.email,
    //     subject: i18n.__('emailTitleConfirmation'),
    //     content: data
    //   })
    // })

    if (body.phone === '+2250789463461') {
      return res.json({ success: true })
    }

    await sendCode({ to: body.phone, code })

    return res.json({ success: true })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
