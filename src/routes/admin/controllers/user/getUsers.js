import User from '../../../../models/user/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user }, res, next) => {
  try {
    const users = await User.find({})
    const countUsers = await User.count({})
    await storeLogger({ action: "Affichage de la liste des utilisateurs de l'application mobile", user })
    return res.json({
      success: true,
      users,
      count: countUsers
    })
  } catch (err) {
    return next(err)
  }
}
