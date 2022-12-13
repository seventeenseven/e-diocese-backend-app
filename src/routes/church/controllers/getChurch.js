import Church from '~/models/church'

export default async ({ query }, res, next) => {
  try {
    let filter = 1

    if (query.order === 'true') {
      filter = -1
    }

    const churchs = await Church.find({})
      .limit(Number(query.limit))
      .sort({ createdAt: filter })
      .lean()

    return res.json({
      success: true,
      churchs
    })
  } catch (err) {
    return next(err)
  }
}
