import Activite from '../../../models/activite/index.js'

export default async ({ query, user }, res, next) => {
  try {
    let filter = 1

    if (query.order === 'true') {
      filter = -1
    }

    let activites

    const ville = typeof user !== 'boolean' ? user.ville : 'abidjan'

    if (query.limit !== '') {
      activites = await Activite.aggregate([
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
      activites = await Activite.aggregate([
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
      activites
    })
  } catch (err) {
    return next(err)
  }
}
