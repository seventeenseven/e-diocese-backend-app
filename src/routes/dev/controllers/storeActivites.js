import Activite from '../../../models/activite'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const activites = await Activite.createActivite(body)
    return res.json({ success: true, activites })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
