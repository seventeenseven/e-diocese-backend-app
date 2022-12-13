import Church from '~/models/church'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const church = await Church.createChurch(body)
    return res.json({ success: true, church })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
