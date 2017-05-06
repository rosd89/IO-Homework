const router = require('express').Router();
const {show, showTxIo} = require('./block.controller');

router.get('/:blockHash', show);

router.get('/:blockHash/:txIo', showTxIo);

module.exports = router;