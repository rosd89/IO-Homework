const router = require('express').Router();
const {index} = require('./block.controller');

router.get('/:blockHash', index);

module.exports = router;