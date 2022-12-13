import Activite from '../../../../models/activite'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const activite = await Activite.createActivite({...body, church: user.id})
    return res.json({
      success: true,
      activite
    })
  } catch (err) {
    return next(err)
  }
}
