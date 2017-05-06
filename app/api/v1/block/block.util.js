const request = require('request');

const BLOCK_DATA_API_URL = 'https://blockchain.info/block-index/$HASH-ITEM?format=json';

/**
 * Block 데이터 가져오기
 *
 * @param hash
 * @param func
 */
exports.getBlockData = (hash, func) => getBlock(hash)
  .then(data => {
    let sumSize = 0;
    let sumValue = 0;

    for (const tx of data.tx) {
      sumSize += tx.size;

      for (const out of tx.out) {
        sumValue += out.value;
      }
    }

    const txCnt = data.n_tx;
    return {
      hash: data.hash,
      txCnt,
      tx: data.tx,
      fee: data.fee,
      avgSize: (sumSize / txCnt).toFixed(2),
      avgValue: (sumValue / txCnt).toFixed(2)
    };
  });

/**
 * Block input 데이터 가져오기
 *
 * @param hash
 * @param func
 */
exports.getBlockInputsData = (hash, func) => getBlock(hash)
  .then(data => {
    const inputs = data.tx.map(tx => {
      return tx.inputs
    });

    return inputs;
  });

/**
 * Block output 데이터 가져오기
 *
 * @param hash
 * @param func
 */
exports.getBlockOutputData = (hash, func) => getBlock(hash)
  .then(data => {
    const output = data.tx.map(tx => {
      return tx.output
    });

    return output;
  });

/**
 * blockchain.info api call
 *
 * @param hash
 */
const getBlock = (hash) => new Promise((resolve, reject) => request({
  url: BLOCK_DATA_API_URL.replace('$HASH-ITEM', hash)
}, (err, res, body) => {
  const statusCode = res.statusCode;

  if (statusCode === 200) {
    resolve(JSON.parse(body));
  }
  else if (statusCode === 500) {
    reject(body);
  }
}));