import Church from '../../../models/church/index.js'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const church = await Church.createChurch(body)
    return res.json({ success: true, church })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
