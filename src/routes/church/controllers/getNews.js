import News from '../../../models/news/index.js'

export default async ({ user, query }, res, next) => {
  try {
    let filter = 1

    if (query.order === 'true') {
      filter = -1
    }

    let news

    const ville = typeof user !== 'boolean' ? user.ville : 'abidjan'

    if (query.limit !== '') {
      news = await News.aggregate([
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
      news = await News.aggregate([
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
      news
    })
  } catch (err) {
    return next(err)
  }
}
