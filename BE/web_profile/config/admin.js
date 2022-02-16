module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '98452b7cc1fd5352227a20cef8eeb41c'),
  },
});
