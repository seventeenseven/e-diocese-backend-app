import Admin from '../../../models/admin'

export default async ({ bodymen: { body }, useragent, headers }, res, next) => {
  try {
    const user = await Admin.createAdmin(body)
    return res.json({
      success: true,
      user
    })
  } catch (err) {
    return next(err)
  }
}
