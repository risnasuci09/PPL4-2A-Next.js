module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1daa2facbf0652ca4157539e3b20ad8d'),
  },
});
