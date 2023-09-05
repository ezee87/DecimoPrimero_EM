import 'dotenv/config';

export default {
    port: process.env.port,
    privateKeyJWT: process.env.privateKeyJWT,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    host: process.env.host,
    passEthereal: process.env.passEthereal,
    emailEthereal: process.env.emailEthereal,
    portEthereal: process.env.portEthereal,
};