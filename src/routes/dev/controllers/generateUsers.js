import { faker } from '@faker-js/faker';
import User, { UserType } from '../../../models/user/index.js';
import { string } from '../../../helpers/index.js';
import generateVerificationCode from '../../../utils/generateVerificationCode/index.js';

export default async (req, res, next) => {
  try {
    // Configuration des données mock
    const imagesMock = Array.from({ length: 50 }, (_, i) =>
      `https://picsum.photos/1000?random=${i}`
    );

    const jobs = [
      'peintre', 'couvreur', 'plombier', 'jardinier', 'maçon',
      'carreleur', 'tapissier', 'chauffagiste', 'taxidermiste', 'esthéticienne'
    ];

    const towns = [
      'abobo', 'adjamé', 'anyama', 'attécoubé', 'bingerville',
      'cocody', 'koumassi', 'marcory', 'plateau', 'treichville'
    ];

    // Création des utilisateurs en parallèle pour meilleure performance
    const userPromises = Array.from({ length: 10 }, async (_, i) => {
      const gender = faker.datatype.number({ min: 0, max: 1 });
      const genderName = gender === 0 ? 'male' : 'female';

      const firstName = faker.name.firstName(genderName);
      const lastName = faker.name.lastName();

      const createUserDto = {
        userType: UserType.craftsman,
        email: string.safeEmail(faker.internet.email({ firstName, lastName })),
        firstName,
        lastName,
        picture: faker.helpers.arrayElement(imagesMock),
        password: 'superSecuredPassword',
        phone: `+225${generateVerificationCode(10)}`,
        emailVerified: true,
        job: faker.helpers.arrayElement(jobs),
        city: 'Abidjan',
        town: faker.helpers.arrayElement(towns),
        address: faker.address.streetAddress(),
        //country: 'Côte d\'Ivoire',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return User.createUser(createUserDto);
    });

    // Exécution parallèle des créations
    const users = await Promise.all(userPromises);

    // Réponse enrichie
    return res.status(201).json({
      success: true,
      message: '10 utilisateurs artisan générés avec succès',
      data: {
        count: users.length,
        ids: users.map(user => user._id),
        generatedAt: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error('Erreur dans generateUsers:', err);
    return next(new Error('Échec de la génération des utilisateurs: ' + err.message));
  }
}
