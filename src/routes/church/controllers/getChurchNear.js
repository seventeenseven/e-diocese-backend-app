import Church from '../../../models/church'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    // await Church.createIndexes({ loc: '2d' })

    let result = await Church.aggregate([
      {
        '$search': {
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
      }
      // {
      //   '$project': {
      //     'location': 1,
      //     'score': { '$meta': 'searchScore' }
      //   }
      // }
    ])

    // Number(query.userLongitude), Number(query.userLatitude

    return res.json({
      success: true,
      result
    })
  } catch (err) {
    return next(err)
  }
}
