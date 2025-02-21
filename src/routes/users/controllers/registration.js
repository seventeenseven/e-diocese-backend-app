import User from '../../../models/user/index.js'
// import { sign } from '../../../services/jwt'
import { sendCode } from '../../../services/orangeKotaci/index.js'
// import Session from '../../../models/session'
//import {publicIpv4} from 'public-ip';


export default async ({ bodymen: { body }, useragent, headers }, res, next) => {
  try {
    // const ipv4 = await publicIpv4()
    // let ip
    // if (process.env.NODE_ENV === 'production') {
    //   ip = headers['x-forwarded-for']
    // } else {
    //   ip = ipv4
    // }
    const user = await User.createUser(body)
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

    await sendCode({ to: body.phone, code })
    // if (user.userExistAndUnverified) {
    //   return res.json({ success: true, message: i18n.__('unverifiedAccountAlreadyAssociated') })
    // }

    // const { sessionId } = await Session.createSession(ip, useragent, {email: body.email, password: body.password, register: true})
    // const token = await sign(user.id)
    return res.json({
      success: true,
      user
      // sessionId,
      // token
    })
  } catch (err) {
    return next(err)
  }
}
