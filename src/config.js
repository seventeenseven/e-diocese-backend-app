import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Corriger __dirname pour ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour vérifier les variables d'environnement
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name];
};

// Charger dotenv-safe en mode développement
if (process.env.NODE_ENV !== "production") {
  import("dotenv-safe").then((dotenvSafe) => {
    dotenvSafe.default.config({
      path: path.join(__dirname, "../.env"),
      sample: path.join(__dirname, "../.env.example"),
    });
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 9000,
    ip: process.env.IP || "0.0.0.0",
    publicHost:
      requireProcessEnv("PUBLIC_HOST") || "https://e-diocese.herokuapp.com/api",
    apiRoot: requireProcessEnv("API_ROOT") || "",
    jwtSecret: requireProcessEnv("JWT_SECRET") || "",
    masterKey: requireProcessEnv("MASTER_KEY") || "",
    proxy: "http://172.16.0.14:3128",
    pushNotification: {
      host: requireProcessEnv("PUSH_NOTIFICATION_HOST") || "",
    },
    cinetpay: {
      host: "https://api-checkout.cinetpay.com/v2",
      apiKey: "252722363635ba443d57d17.63341972",
      siteId: "915963",
      secretKey: "18073365586366a9d576b5c1.17994038",
      notifyUrl: "",
    },
    twilio: {
      accountSid: requireProcessEnv("TWILIO_ACCOUNT_SID"),
      authToken: requireProcessEnv("TWILIO_AUTH_TOKEN"),
      sendNumber: requireProcessEnv("TWILIO_SEND_NUMBER"),
    },
    orangeKotaci: {
      host: "https://kota-ci.com",
    },
    mail: {
      user: requireProcessEnv("MAIL_USER"),
      pass: requireProcessEnv("MAIL_PASS"),
      default: requireProcessEnv("MAIL_DEFAULT"),
    },
    mailConfigs: {
      host: requireProcessEnv("MAIL_HOST"),
      port: requireProcessEnv("MAIL_PORT"),
    },
    sendgrid: {
      apiKey: requireProcessEnv("SENDGRID_API_KEY"),
    },
    firebase: {
      databaseUrl: "",
    },
    mongo: {
      options: {

      },
    },
    security: {
      accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRES_IN || 48,
      jwtStrategyExpiry: process.env.JWT_STRATEGY_EXPIRES_IN || "7d",
    },
  },
  test: {
    mongo: {
      uri: "mongodb://localhost/artisans-backend-test",
      options: {
        debug: false,
      },
    },
  },
  development: {
    baseUrl: "http://192.168.1.116:8080/api",
    mongo: {
      uri: process.env.MONGODB_URI || requireProcessEnv("MONGODB_DEV_URI"),
      options: {
        debug: true,
      },
    },
  },
  production: {
    baseUrl: requireProcessEnv("PUBLIC_HOST"),
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || requireProcessEnv("MONGODB_PROD_URI"),
      options: {},
    },
  },
  loaders: [
    {
      test: /.js$/,
      loader: "babel-loader",
      include: [path.resolve(__dirname, "test"), path.resolve(__dirname, "src")],
      exclude: /node_modules/,
    },
  ],
};

export const env = config.all.env;
const configEnv = config[env];

// Exportation des constantes
export const mongo = configEnv.mongo; //To change
export const security = config.all.security;
export const apiRoot = config.all.apiRoot;
export const port = config.all.port;
export const ip = config.all.ip;

export const proxy = config.all.proxy;
export const jwtSecret = config.all.jwtSecret;
export const masterKey = config.all.masterKey;
export const publicHost = config.all.publicHost;
export const pushNotification = config.all.pushNotification;
export const cinetpay = config.all.cinetpay;
export const orangeKotaci = config.all.orangeKotaci;
export const mail = config.all.mail;
export const mailConfigs = config.all.mailConfigs;
export const sendgrid = config.all.sendgrid;
export const test = config.test;
export const development = config.development;
export const loaders = config.all.loaders;
export const production = config.all.production;

// Exporter l'objet config par défaut
export default config;
