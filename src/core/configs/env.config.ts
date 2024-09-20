export const environment = {
    MONGO_HOST_NAME: process.env.MONGO_HOST_NAME || 'mongo',
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'discord-db',
    AUTH_PRIVATE_KEY: process.env.AUTH_PRIVATE_KEY,
    AUTH_PUBLIC_KEY: process.env.AUTH_PUBLIC_KEY,
    EMAIL_ADDRESS: process.env.EMAIl_ADDRESS,
    EMAIl_PASSCODE: process.env.EMAIl_PASSCODE,
};
