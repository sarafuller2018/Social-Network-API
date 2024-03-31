// imports express router and necessary files
const router = require('express').Router();
const apiRoutes = require('./api');

// creates the route
router.use("/api", apiRoutes);

// exports for use
module.exports = router;