module.exports = {
  app: {
    port: 3001,
    host: 'localhost',
    secret: process.env.JWT_SECRET || '2EE915FE928E54D2CBA8D66487744',
  },
  db: {
    mongo: {
      uri: 'mongodb://localhost:27017/ihero',
    },
  },
};
