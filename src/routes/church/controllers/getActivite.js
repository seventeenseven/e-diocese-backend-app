import Activite from '../../../models/activite'

export default async ({ user, query }, res, next) => {
  try {
    let filter = 1

    if (query.order === 'true') {
      filter = -1
    }

    let activites

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
            'churches.ville': { $regex: user != null ? user.ville : 'abidjan', $options: 'i' }
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
            'churches.ville': { $regex: user != null ? user.ville : 'abidjan', $options: 'i' }
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
