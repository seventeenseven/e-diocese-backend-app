import Admin from '../../../models/admin/index.js'

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
