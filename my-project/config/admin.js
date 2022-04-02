module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '86be3e94c8ca829b0ef5e76d10070409'),
  },
});
