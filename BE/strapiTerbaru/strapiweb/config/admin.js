module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '52bd8a414f79f625d775d6aa0472d3dc'),
  },
});
