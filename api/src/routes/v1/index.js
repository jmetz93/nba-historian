const router = require('express').Router();
const authRouter = require('./auth.route');

router.use('/auth', authRouter);

module.exports = router;