import Video from '~/models/video'

export default async ({ user, query }, res, next) => {
  try {
    let filter = 1

    if (query.order === 'true') {
      filter = -1
    }
    let videos
    const ville = typeof user !== 'boolean' ? user.ville : 'abidjan'

    if (query.limit !== '') {
      videos = await Video.aggregate([
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
        },
        {
          $sort: { createdAt: filter }
        },
        {
          $limit: Number(query.limit)
        }
      ])
    } else {
      videos = await Video.aggregate([
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
        },
        {
          $sort: { createdAt: filter }
        }
      ])
    }

    return res.json({
      success: true,
      videos
    })
  } catch (err) {
    return next(err)
  }
}
