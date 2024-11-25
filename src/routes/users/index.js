import {
  registration,
  getMe,
  getUser,
  waitingList,
  updatePassword,
  updateMe,
  sendVerificationCode,
  checkVerificationCode,
  contact,
  updateProfilePicture,
  getCraftsmen,
  searchCraftsmen,
  craftsman,
  uploadImages,
  postComment,
  verifyCcodeAndReset,
  loginOrRegisterWithGoogle,
  deleteAccount
} from './controllers/index.js'
import { middleware as body } from 'bodymen'
import { Router } from 'express'
import { token, master } from '../../services/passport/index.js'
import { createUserDto } from './dto/createUserDto.js'
import { createUserWaitingDto } from './dto/createUserWaitingDto.js'
import { updatePasswordDto } from './dto/updatePasswordDto.js'
import { updateMeDto, email } from './dto/updateMeDto.js'
import { contactDto } from './dto/contactDto.js'
import { schema } from '../../models/user/index.js'

const router = new Router()

const { phone, country } = schema.tree

router.post('/registration', body(createUserDto), registration)
router.get('/me', token({ required: true }), getMe)
router.get('/:id', token({ required: true }), getUser)
router.post('/waiting-list', body(createUserWaitingDto), waitingList)

router.put(
  '/update-password',
  token({ required: true }),
  body(updatePasswordDto),
  updatePassword
)

router.put(
  '/update-me',
  token({ required: true }),
  body(updateMeDto),
  updateMe
)

router.post(
  '/send-verification-code',
  body({
    phone,
    country
  }),
  sendVerificationCode
)

router.post(
  '/check-verification-code',
  body({
    email,
    code: { type: String, required: true }
  }),
  checkVerificationCode
)

router.post(
  '/verify-code-reset',
  body({
    email,
    code: { type: String, required: true }
  }),
  verifyCcodeAndReset
)

router.post('/contact', body(contactDto), contact)

router.patch(
  '/update-profile-picture',
  token({ required: true }),
  body({
    picture: { type: String, required: true }
  }),
  updateProfilePicture
)

router.get('/craftsmen/getSome/:limit', master(), getCraftsmen)

router.get('/craftsmen/search', master(), searchCraftsmen)

router.get('/craftsmen/:id/get', master(), craftsman)

router.post(
  '/upload-images',
  token({ required: true }),
  body({
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    image5: { type: String }
  }),
  uploadImages
)

router.post(
  '/comment/post',
  token({ required: true }),
  body({
    comment: { type: String, required: true },
    // author: { type: String, required: true },
    craftsman: { type: String, required: true }
  }),
  postComment
)

router.post(
  '/auth/google',
  master(),
  body({
    email,
    firstName: { type: String },
    lastName: { type: String }
  }),
  loginOrRegisterWithGoogle
)

router.delete('/delete-account/:id',
  token(),
  deleteAccount)

export default router
