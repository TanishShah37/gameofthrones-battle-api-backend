const mongoose = require('mongoose');
const util = require('util');
const BattleModel = require('./models/battle')
const config = require('./config/config');
const app = require('./express');
const csvToJson = require('csvtojson');
const colors = require('colors')
const path = require('path');

mongoose.Promise = Promise;

mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
    const error = new Error(`unable to connect to db: ${config.mongo.uri} with error: ${err}`);
    util.log(colors.red(error));
});

(async () => {
    try {
        const jsonarray = await csvToJson().fromFile(path.join(__dirname, './battles.csv'));
        await BattleModel.deleteMany({});
        await BattleModel.insertMany(jsonarray);
        util.log(colors.green('Battle: CSV Data inserted into Mongo Successfully'));
    } catch (error) {
        util.log(colors.red('Battle: Error while inserting Battle.csv data to Mongo'));
    }
})();


var port = process.env.PORT || 4001
app.listen(port, () => {
    util.log(colors.green(`Game of Thrones API Backend Server started at Port: ${port}`));
});

module.exports = app;