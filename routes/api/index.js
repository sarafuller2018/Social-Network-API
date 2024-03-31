// imports express router and necessary files
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// creates the routes using the files
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// exports for use
module.exports = router;