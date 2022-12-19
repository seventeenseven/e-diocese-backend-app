import { login, logout, registration, getMe, updateMe,
  getChurches,
  getChurch,
  putChurch,
  deleteChurch,
  createChurch,
  createActivite,
  deleteActivite,
  getActivite,
  getActivites,
  putActivite,
  createNews,
  deleteNews,
  getNews,
  getOnlyNews,
  putNews,
  createVideo,
  deleteVideo,
  getVideo,
  getVideos,
  putVideo,
  getUserParticipateActivity,
  getPrieres,
  deletePriere,
  getPriere,
  getPrayerPrice,
  putPrayerPrice,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  putUser,
  createDonationPrice,
  deleteDonationPrice,
  getDonationPrice,
  getDonationPrices,
  putDonationPrice,
  createReading,
  deleteReading,
  getReading,
  getReadings,
  putReading
} from './controllers'
import { middleware as body } from 'bodymen'
import { Router } from 'express'
import { schema } from '~/models/admin'
import { tokenAdmin } from '../../services/passportAdmin'
import createChurchDto from './dto/createChurchDto'
import createActiviteDto from './dto/createActiviteDto'
import createNewsDto from './dto/createNewsDto'
import createVideoDto from './dto/createVideoDto'
import { createUserDto } from '../users/dto/createUserDto'
import { updateMeDto } from '../users/dto/updateMeDto'

const router = new Router()

const { email, phone } = schema.tree

router.post(
  '/login',
  body({
    identifiant: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }),
  login
)
router.delete('/logout/:id',
  tokenAdmin({ required: true }),
  logout)

router.post(
  '/registration',
  body({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      default: null
    },
    email,
    phone,
    password: {
      type: String,
      required: true
    }
  }),
  registration
)

router.put('/update-me',
  tokenAdmin({ required: true }),
  body({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email,
    phone
  }),
  updateMe
)

router.get('/me',
  tokenAdmin({ required: true }),
  getMe)

/** CRUD */

/** Church */

router.get('/church',
  tokenAdmin({ required: true }),
  getChurches)

router.get('/church/:id',
  tokenAdmin({ required: true }),
  getChurch)

router.delete('/church/:id',
  tokenAdmin({ required: true }),
  deleteChurch)

router.put('/church/:id',
  tokenAdmin({ required: true }),
  body(createChurchDto),
  putChurch
)

router.post('/church',
  tokenAdmin({ required: true }),
  body(createChurchDto),
  createChurch
)

/** Activite */

router.get('/activite',
  tokenAdmin({ required: true }),
  getActivites)

router.get('/activite/:id',
  tokenAdmin({ required: true }),
  getActivite)

router.delete('/activite/:id',
  tokenAdmin({ required: true }),
  deleteActivite)

router.put('/activite/:id',
  tokenAdmin({ required: true }),
  body(createActiviteDto),
  putActivite
)

router.post('/activite',
  tokenAdmin({ required: true }),
  body(createActiviteDto),
  createActivite
)

/** News */

router.get('/news',
  tokenAdmin({ required: true }),
  getNews)

router.get('/news/:id',
  tokenAdmin({ required: true }),
  getOnlyNews)

router.delete('/news/:id',
  tokenAdmin({ required: true }),
  deleteNews)

router.put('/news/:id',
  tokenAdmin({ required: true }),
  body(createNewsDto),
  putNews
)

router.post('/news',
  tokenAdmin({ required: true }),
  body(createNewsDto),
  createNews
)

/** Video */

router.get('/videos',
  tokenAdmin({ required: true }),
  getVideos)

router.get('/videos/:id',
  tokenAdmin({ required: true }),
  getVideo)

router.delete('/videos/:id',
  tokenAdmin({ required: true }),
  deleteVideo)

router.put('/videos/:id',
  tokenAdmin({ required: true }),
  body(createVideoDto),
  putVideo
)

router.post('/videos',
  tokenAdmin({ required: true }),
  body(createVideoDto),
  createVideo
)

/** Participate activity */

router.get('/users/participate-activity',
  tokenAdmin({ required: true }),
  getUserParticipateActivity)

/** Prieres */

router.get('/prieres/intentions',
  tokenAdmin({ required: true }),
  getPrieres)

router.delete('/prieres/intentions/:id',
  tokenAdmin({ required: true }),
  deletePriere)

router.get('/prieres/intentions/:id',
  tokenAdmin({ required: true }),
  getPriere)

/** Prices */

router.get('/price/get',
  tokenAdmin({ required: true }),
  getPrayerPrice)

router.put('/price/:id',
  tokenAdmin({ required: true }),
  body({
    amount: {
      type: Number,
      required: true
    }
  }),
  putPrayerPrice
)

/** Users */

router.get('/users',
  tokenAdmin({ required: true }),
  getUsers)

router.get('/users/:id',
  tokenAdmin({ required: true }),
  getUser)

router.delete('/users/:id',
  tokenAdmin({ required: true }),
  deleteUser)

router.put('/users/:id',
  tokenAdmin({ required: true }),
  body(updateMeDto),
  putUser
)

router.post('/users',
  tokenAdmin({ required: true }),
  body(createUserDto),
  createUser
)

/** DonationPrice */

router.get('/donation',
  tokenAdmin({ required: true }),
  getDonationPrices)

router.get('/donation/:id',
  tokenAdmin({ required: true }),
  getDonationPrice)

router.delete('/donation/:id',
  tokenAdmin({ required: true }),
  deleteDonationPrice)

router.put('/donation/:id',
  tokenAdmin({ required: true }),
  body({
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }),
  putDonationPrice
)

router.post('/donation',
  tokenAdmin({ required: true }),
  body({
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }),
  createDonationPrice
)

/** ReadingDay */

router.get('/reading',
  tokenAdmin({ required: true }),
  getReadings)

router.get('/reading/:id',
  tokenAdmin({ required: true }),
  getReading)

router.delete('/reading/:id',
  tokenAdmin({ required: true }),
  deleteReading)

router.put('/reading/:id',
  tokenAdmin({ required: true }),
  body({
    date: {
      type: Date,
      required: true
    },
    titre: {
      type: String,
      required: true
    },
    passage: {
      type: String,
      required: true
    },
    versets: {
      type: String,
      required: true
    },
    contenu: {
      type: String,
      required: true
    }
  }),
  putReading
)

router.post('/reading',
  tokenAdmin({ required: true }),
  body({
    date: {
      type: Date,
      required: true
    },
    titre: {
      type: String,
      required: true
    },
    passage: {
      type: String,
      required: true
    },
    versets: {
      type: String,
      required: true
    },
    contenu: {
      type: String,
      required: true
    }
  }),
  createReading
)

export default router
