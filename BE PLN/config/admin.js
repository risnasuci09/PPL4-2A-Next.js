module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e6a8be8e23d82ab1cae820b5252d1e3a'),
  },
});
