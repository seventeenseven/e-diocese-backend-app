import PrayerPrice from '../../../models/prayerPrice'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const prices = await PrayerPrice.createPrice(body)
    return res.json({ success: true, prices })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
