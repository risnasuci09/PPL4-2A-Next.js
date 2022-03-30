module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4ac478acb9bcd75affe6b01423b69b46'),
  },
});
