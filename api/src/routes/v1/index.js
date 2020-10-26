const router = require('express').Router();
const authRouter = require('./auth.route');
const docsRouter = require('./docs.route');

router.use('/auth', authRouter);
router.use('/docs', docsRouter);

module.exports = router;