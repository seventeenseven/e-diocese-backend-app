import ReadingDay from '../../../models/readingDay'

export default async ({ user }, res, next) => {
  try {
    const ville = typeof user !== 'boolean' ? user.ville : 'abidjan'

    const readingsDay = await ReadingDay.aggregate([
      {
        $lookup: {
          from: 'churches',
          localField: 'church',
          foreignField: '_id',
          as: 'churches'
        }
      },
      {
        $unwind: {
          path: '$churches'
        }
      },
      {
        $match: {
          'churches.ville': { $regex: ville, $options: 'i' }
        }
      }
    ])
    return res.json({
      success: true,
      readingsDay
    })
  } catch (err) {
    return next(err)
  }
}
