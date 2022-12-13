import * as faker from 'faker'
import User, { UserType } from '~/models/user'
import { string } from '~/helpers'
import generateVerificationCode from '~/utils/generateVerificationCode'

export default async (req, res, next) => {
  try {
    /**
     * Generate 10 random users for testing
     * TODO: Remove when we go in production
     */
    for (let i = 0; i <= 10; i += 1) {
      const imagesMock = Array.from(Array(50).keys()).map(id => `https://picsum.photos/1000?random=${id}`)
      const gender = faker.random.arrayElement([0, 1])
      const firstName = faker.name.firstName(gender)
      const lastName = faker.name.lastName(gender)
      const createUserDto = {
        userType: UserType.craftsman,
        email: string.safeEmail(faker.internet.email()),
        firstName,
        lastName,
        picture: faker.random.arrayElement(imagesMock),
        password: 'superSecuredPassword',
        phone: `+225${generateVerificationCode(10)}`,
        emailVerified: true,
        job: faker.random.arrayElement(['peintre',
          'couvreur',
          'plombier',
          'jardinier',
          'maçon',
          'carreleur',
          'tapissier',
          'chauffagiste',
          'taxidermiste',
          'esthéticienne']),
        city: 'Abidjan',
        town: faker.random.arrayElement(['abobo',
          'adjamé',
          'anyama',
          'attécoubé',
          'bingerville',
          'cocody',
          'koumassi',
          'marcory',
          'plateau',
          'treichville'])
      }
      await User.createUser(createUserDto)
    }
    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
