const request = require('request');

const BLOCK_DATA_API_URL = 'https://blockchain.info/block-index/$HASH-ITEM?format=json';

/**
 * Block 데이터 가져오기
 *
 * @param hash
 * @param func
 */
exports.getBlockData = (hash, func) => request({
  url: BLOCK_DATA_API_URL.replace('$HASH-ITEM', hash)
}, (err, res, body) => {
  func(JSON.parse(body));
});