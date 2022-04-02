module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8b04263a03c75d4bb1166038eb9de656'),
  },
});
