module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd7c392e59aa1b4df0f911ed6727cefa5'),
  },
});
