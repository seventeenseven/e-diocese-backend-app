import { Router } from 'express'
import {
  generateUsers,
  storeNotifications,
  storeChurch,
  storeActivites,
  storeNews,
  storeVideo,
  storePrice,
  donationPrice,
  storeReading
} from './controllers'
import { master } from '~/services/passport'
import { middleware as body } from 'bodymen'

const router = new Router()

router.post('/generateUsers', master(), generateUsers)

router.post(
  '/notification',
  body({
    title: { type: String },
    message: { type: String },
    user: { type: String }
  }),
  storeNotifications
)

router.post(
  '/church',
  body({
    nom: { type: String },
    description: { type: String },
    image: { type: String },
    ville: { type: String },
    commune: { type: String },
    location: {
      coordinates: [Number]
    }
  }),
  storeChurch
)

router.post(
  '/activites',
  body({
    titre: { type: String },
    description: { type: String },
    image: { type: String },
    ville: { type: String },
    commune: { type: String },
    date: { type: Date }
  }),
  storeActivites
)

router.post(
  '/news',
  body({
    titre: { type: String },
    description: { type: String },
    image: { type: String },
    sousTitre: { type: String }
  }),
  storeNews
)

router.post(
  '/videos',
  body({
    url: { type: String },
    titre: { type: String },
    description: { type: String }
  }),
  storeVideo
)

router.post(
  '/priere',
  body({
    label: { type: String },
    amount: { type: Number }
  }),
  storePrice
)

router.post(
  '/donation-price',
  body({
    label: { type: String },
    value: { type: Number }
  }),
  donationPrice
)

router.post(
  '/reading',
  body({
    date: { type: Date },
    titre: { type: String },
    passage: { type: String },
    versets: { type: String },
    contenu: { type: String }
  }),
  storeReading
)

export default router
