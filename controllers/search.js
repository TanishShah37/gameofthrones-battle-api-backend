const BattleModel = require('../models/battle')
const util = require('util');
const colors = require('colors');

module.exports = async (req, res) => {
    try {
      util.log(colors.green(`Battle API : Search: Search Battle for ${JSON.stringify(req.query)}`));
      const blogs = await BattleModel.find(req.query, { _id: 0 });
      if (blogs.length === 0) {
        util.log(colors.green(`Battle API : search :  No data found for search: ${JSON.stringify(req.query)}`));
        res.status(204).send({
          message: `No data found for search: ${JSON.stringify(req.query)}`,
        });
      } else {
        res.status(200).send(JSON.stringify(blogs));
      }
    } catch (error) {
      util.log(colors.red(`Battle API : search:  Error while searching battle for: ${JSON.stringify(req.query)}: ${error.stack ? error.stack : error}`));
      res.httpStatus(400).send({
        message: `Error while searching battle for: ${JSON.stringify(req.query)}: ${error}`,
      });
    }
  }
