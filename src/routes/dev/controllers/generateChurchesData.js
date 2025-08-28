
import User, { UserType } from '../../../models/user/index.js';
import Church from '../../../models/church/index.js';
import Activity from '../../../models/activite/index.js';
import News from '../../../models/news/index.js';

import { faker } from '@faker-js/faker/locale/fr';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Configuration
const DB_URI = 'mongodb://root:rootpassword@mongo:27017/e-diocese?authSource=admin';
const SALT_ROUNDS = 10;
const DEFAULT_PASSWORD = 'Password123!';

// Données statiques
const CITIES = ['Bertoua', 'Douala', 'Yaoundé', 'Edea', 'Bafia'];
const COMMUNES = ['Plateau', 'Cocody', 'Marcory', 'Treichville', 'Koumassi'];
const JOBS = [
  'Prêtre', 'Diacre', 'Secrétaire', 'Organiste',
  'Catéchiste', 'Trésorier', 'Choriste', 'Bénévole'
];
const saintNames = ['Soeur Anne',' Saint Pierre', 'Saint Jesus']

const seedDatabase = async () => {
  try {
    // Connexion DB
    await mongoose.connect(DB_URI);
    console.log('✅ Connecté à MongoDB');

    // Création des églises
    const churches = await Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        const city = faker.helpers.arrayElement(CITIES);
        return Church.createChurch({
          nom: `Église ${faker.address.street()} ${faker.helpers.arrayElement(saintNames)}`,
          description: faker.lorem.paragraphs(2),
          ville: city,
          commune: faker.helpers.arrayElement(COMMUNES),
          pays: "Cameroun",
          email: `eglisecm${i}@diocese.cm`,
          password: await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS),
          location: {
            coordinates: [
              faker.datatype.float({ min: -6, max: -2, precision: 0.0001 }),
              faker.datatype.float({ min: 4, max: 8, precision: 0.0001 })
            ],
            type: 'Point'
          },
          lastLogin: faker.date.recent()
        });
      })
    );
    console.log(`⛪ ${churches.length} églises créées`);

    // Création des utilisateurs
    const users = await Promise.all(
      Array.from({ length: 20 }, async (_, i) => {
        const gender = faker.datatype.number({ min: 0, max: 1 });
        const genderName = gender === 0 ? 'male' : 'female';

        return User.createUser({
          name: faker.name.fullName({ sex: genderName }),
          phone: `+23707${faker.datatype.number({ min: 100000, max: 999999 })}`,
          email: `user${i}@diocese.cm`,
          role: i < 3 ? 'admin' : 'user',
          church: faker.helpers.arrayElement(churches)._id,
          job: faker.helpers.arrayElement(JOBS),
          country : "CM",
          createdAt: new Date(),
          updatedAt: new Date()
        });
      })
    );
    console.log(`👥 ${users.length} utilisateurs créés`);

    // Création des actualités
    const news = await Promise.all(
      churches.flatMap(church =>
        Array.from({ length: 4 }, () => ({
          titre: faker.lorem.words(6),
          sousTitre: faker.lorem.sentence(),
          description: faker.lorem.paragraphs(3),
          image: `https://picsum.photos/800/600?random=${faker.datatype.number(100)}`,
          church: church._id
        }))
      ).map(data => News.createNews(data))
    );
    console.log(`📰 ${news.length} actualités créées`);

    // Création des activités
    const activities = await Promise.all(
      churches.flatMap(church =>
        Array.from({ length: 5 }, () => ({
          titre: faker.lorem.words(4),
          description: faker.lorem.paragraphs(2),
          image: `https://picsum.photos/800/600?random=${faker.datatype.number(100)}`,
          ville: church.ville,
          commune: church.commune,
          date: faker.date.future(),
          church: church._id
        }))
      ).map(data => Activity.createActivite(data))
    );
    console.log(`🎭 ${activities.length} activités créées`);

    console.log('\n🌱 Base de données seedée avec succès !');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur de seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
