import Church from '../../../models/church'

export default async ({ bodymen: { body }, user, query }, res, next) => {
  try {
    // await Church.createIndexes({ loc: '2d' })

    let filter = 1

    if (query.order === 'true') {
      filter = -1
    }

    let result = await Church.aggregate([
      {
        $search: {
          'index': 'autocomplete',
          'compound': {
            'must': [
              // {
              //   'autocomplete': {
              //     'query': `${body.nom}`,
              //     'path': 'nom'
              //   }
              // },
              {
                'geoWithin': {
                  'circle': {
                    'center': {
                      'type': 'Point',
                      'coordinates': [body.userLongitude, body.userLatitude]
                    },
                    'radius': '10000'
                  },
                  'path': 'location.coordinates'
                }
              }
            ]
          }
        }
      },
      // {
      //   '$project': {
      //     'location': 1,
      //     'score': { '$meta': 'searchScore' }
      //   }
      // }
      {
        $sort: { createdAt: filter }
      },
      {
        $limit: Number(query.limit)
      }
    ])

    // Number(query.userLongitude), Number(query.userLatitude

    return res.json({
      success: true,
      churchs: result
    })
  } catch (err) {
    return next(err)
  }
}
