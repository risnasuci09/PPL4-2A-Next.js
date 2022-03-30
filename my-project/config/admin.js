module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0fda4ce3613512e99e3c784b00330a80'),
  },
});
