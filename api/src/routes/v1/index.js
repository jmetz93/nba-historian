const router = require('express').Router();
const authRouter = require('./auth.route');
const docsRouter = require('./docs.route');
const ballDontLieRouter = require('./ballDontLie.route');

router.use('/auth', authRouter);
router.use('/docs', docsRouter);
router.use('/ballDontLie', ballDontLieRouter);

module.exports = router;