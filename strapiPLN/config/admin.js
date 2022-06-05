module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b26307b08752f8ea15a57bbdffb7a1d6'),
  },
});
