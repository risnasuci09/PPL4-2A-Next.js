module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5215f266d56d337a6d8948cd659efb6f'),
  },
});
