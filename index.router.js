const express = require('express');
const router = express.Router();

const HealthController = require('./controllers/health');
const SearchController = require('./controllers/search');
const CountController = require('./controllers/count');
const ListController = require('./controllers/list');


router.get('/health', HealthController);

router.get('/search', SearchController);

router.get('/count', CountController);

router.get('/list/:entity', ListController);

module.exports = router;
