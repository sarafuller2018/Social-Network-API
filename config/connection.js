// imports mongoose
const { connect, connection } = require('mongoose');

// inserts mongo server URL
const connectionString = 'mongodb://127.0.0.1:27017/socialDB';

// connecting to the mongo DB URL
connect(connectionString);

// exporting for use
module.exports = connection;