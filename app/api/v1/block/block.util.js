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

    const n_tx = data.n_tx;
    return {
      hash: data.hash,
      n_tx,
      fee: data.fee,
      avg_size: (sumSize / n_tx).toFixed(2),
      avg_value: (sumValue / n_tx).toFixed(2)
    };
  });

/**
 * Block input 데이터 가져오기
 *
 * @param hash
 * @param func
 */
const getBlockInputsData = hash => getBlock(hash)
  .then(data => {
    const inputs = data.tx.map(tx => {
      return tx.inputs
    });

    return {
      row_cnt: inputs.length,
      input: inputs
    };
  });

/**
 * Block output 데이터 가져오기
 *
 * @param hash
 * @param func
 */
const getBlockOutputData = hash => getBlock(hash)
  .then(data => {
    const out = data.tx.map(tx => {
      return tx.out
    });

    return {
      row_cnt: out.length,
      output: out
    };
  });

/**
 * tx inputs or output data 반환
 *
 * @type {{input: ((p1?:*)=>(*)), output: ((p1?:*)=>(*))}}
 */
exports.getBlockTxIoData = {
  'input': getBlockInputsData,
  'output': getBlockOutputData
};

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