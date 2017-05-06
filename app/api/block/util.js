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
  const data = JSON.parse(body);

  let sumSize= 0;
  let sumValue = 0;

  for (const tx of data.tx) {
    sumSize += tx.size;

    for (const out of tx.out) {
      sumValue += out.value;
    }
  }

  const txCnt = data.n_tx;

  func({
    hash: data.hash,
    txCnt,
    tx: data.tx,
    fee: data.fee,
    avgSize: (sumSize / txCnt).toFixed(2),
    avgValue: (sumValue / txCnt).toFixed(2)
  });
});

