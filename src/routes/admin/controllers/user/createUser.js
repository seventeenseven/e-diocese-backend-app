import User from '../../../../models/user/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const user = await User.createUserByAdmin(body)
    await storeLogger({ action: "Création d'un utilisateur", user })
    return res.json({
      success: true,
      user
    })
  } catch (err) {
    return next(err)
  }
}
