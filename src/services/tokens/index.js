import { v4 } from 'uuid'
import mongoose from 'mongoose'
import { hashSync } from 'bcrypt'
import cryptoRandomString from 'crypto-random-string'

export const generateUuid = () => {
  return v4()
}

export const generateMongoId = () => {
  return mongoose.Types.ObjectId()
}

export const hashPlainPassword = (password) => {
  return hashSync(password, 8)
}

export const generateRandomString = (length = 32, charactersOrType = 'alphanumeric') => {
  return cryptoRandomString({
    length,
    type: charactersOrType
  })
}

export const generateRandomEncryptedPassword = (length = 16) => {
  if (length < 8) {
    throw new Error('Password length too small')
  }
  const randomString = generateRandomString(length)
  return hashPlainPassword(randomString)
}
