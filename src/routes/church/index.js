import {
  getChurch,
  getActivite,
  getNews,
  getVideo,
  addChurchToFavoris,
  getChurchFavoris,
  addNewsFavoris,
  addPrayer,
  getPrayer,
  addActiviteToFavoris,
  getActiviteFavoris,
  addParticipateActiviteUser,
  addVideoToFavoris,
  getChurchNear,
  payPrayerIntentions,
  cinetpayNotify,
  checkCinetpayStatus,
  getSimilarChurch,
  getSimilarActivite,
  getSimilarNews,
  getSimilarVideo,
  getNewsFavoris,
  getVideosFavoris,
  getOnlyChurch,
  getOnlyActivite,
  getOnlyNews,
  getOnlyVideo,
  getDonationPrice,
  sendDonation,
  getUserParticipateActivity,
  getOnlyReadingDay,
  getReadingDay
} from './controllers/index.js'
import { Router } from 'express'
import { token } from '../../services/passport/index.js'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { prayerDto } from './dto/prayerDto.js'
import { master } from '../../services/passportAdmin/index.js'

const router = new Router()

router.get('/get',
  query(),
  master(),
  getChurch)

router.get('/similar/:id',
  master(),
  getSimilarChurch)

router.get('/activites/get',
  token({ required: false }),
  query(),
  getActivite)

router.get('/activites-similar/:id',
  master(),
  getSimilarActivite)

router.get('/news/get',
  query(),
  token({ required: false }),
  getNews)

router.get('/news-similar/:id',
  master(),
  getSimilarNews)

router.get('/videos/get',
  query(),
  token({ required: false }),
  getVideo)

router.get('/videos-similar/:id',
  master(),
  getSimilarVideo)

router.post(
  '/add-to-favoris',
  token({ required: true }),
  body({
    church: {
      type: String,
      required: true
    }
  }),
  addChurchToFavoris
)

router.get('/favoris/get',
  token({ required: true }),
  getChurchFavoris)

router.post(
  '/add-news-favoris',
  token({ required: true }),
  body({
    news: {
      type: String,
      required: true
    }
  }),
  addNewsFavoris
)

router.post(
  '/add-activite-favoris',
  token({ required: true }),
  body({
    activite: {
      type: String,
      required: true
    }
  }),
  addActiviteToFavoris
)

router.get('/activite-favoris/get',
  token({ required: true }),
  getActiviteFavoris)

router.get('/news-favoris/get',
  token({ required: true }),
  getNewsFavoris)

router.get('/videos-favoris/get',
  token({ required: true }),
  getVideosFavoris)

router.post(
  '/add-prayer',
  token({ required: true }),
  body(prayerDto),
  addPrayer
)

router.get('/prieres/get',
  token({ required: true }),
  getPrayer)

router.post(
  '/add-participate-activite',
  token({ required: true }),
  body({
    activite: {
      type: String,
      required: true
    }
  }),
  addParticipateActiviteUser
)

router.post(
  '/add-video-favoris',
  token({ required: true }),
  body({
    video: {
      type: String,
      required: true
    }
  }),
  addVideoToFavoris
)

router.post('/near',
  master(),
  query(),
  body({
    // nom: {
    //   type: String
    // },
    userLongitude: {
      type: Number,
      required: true
    },
    userLatitude: {
      type: Number,
      required: true
    }
  }),
  getChurchNear)

router.post(
  '/pay',
  token({ required: true }),
  body({
    currency: {
      type: String
    }
  }),
  payPrayerIntentions
)

router.post(
  '/cinetpay/notify',
  cinetpayNotify
)

router.post(
  '/transaction/check',
  token({ required: true }),
  body({
    transactionId: {
      type: String
    }
  }),
  checkCinetpayStatus
)

router.get('/:churchId',
  token({ required: false }),
  getOnlyChurch)

router.get('/activite/:activiteId',
  token({ required: false }),
  getOnlyActivite)

router.get('/news/:newsId',
  token({ required: false }),
  getOnlyNews)

router.get('/video/:videoId',
  token({ required: false }),
  getOnlyVideo)

router.get('/donation/price',
  master(),
  getDonationPrice)

router.post(
  '/donation/send',
  token({ required: true }),
  body({
    amount: {
      type: Number
    },
    church: {
      type: String
    }
  }),
  sendDonation
)

router.get('/participate/activities',
  token({ required: true }),
  getUserParticipateActivity)

router.get('/reading-day/get',
  token({ required: false }),
  getReadingDay)

router.get('/reading-day/:id',
  token({ required: false }),
  getOnlyReadingDay)

export default router
