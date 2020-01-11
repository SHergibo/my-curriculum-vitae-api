const Express = require('express'),
      UserRoutes = require('./user.route'),
      MailRoutes = require('./mail.route'),
      InfoRoutes = require('./info.route'),
      EducRoutes = require('./education.route'),
      ExpeRoutes = require('./experience.route'),
      AuthRoutes = require('./auth.route'),
      TokenAuthRoutes = require('./token-auth.route');

const router = Express.Router();

router.get('/status', (req, res) => res.send(200));

router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/mail', MailRoutes);
router.use('/info', InfoRoutes);
router.use('/education', EducRoutes);
router.use('/experience', ExpeRoutes);
router.use('/tokens', TokenAuthRoutes);

module.exports = router;