import PrayerPrice from '../../../../models/prayerPrice'

export default async ({ user }, res, next) => {
  try {
    const price = await PrayerPrice.findOne({}).lean()
    return res.json({
      success: true,
      ...price
    })
  } catch (err) {
    return next(err)
  }
}
