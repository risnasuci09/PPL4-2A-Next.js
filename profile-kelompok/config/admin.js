module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a50415ccdabf4126e4d4e2941dcccf55'),
  },
});
