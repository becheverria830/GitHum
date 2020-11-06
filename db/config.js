const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://admin:8N79Ytxy20PxaFY8@cse416.pbdd5.mongodb.net/test?authSource=admin&replicaSet=atlas-gyc0xy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));
