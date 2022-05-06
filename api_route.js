const router = require('express').Router();

// Importing routing level middleware
const contactRouter = require('./controller/contact.controller');

router.use('/contact', contactRouter);

module.exports = router;