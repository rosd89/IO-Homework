const request = require('request');

const BLOCK_DATA_API_URL = 'https://blockchain.info/block-index/$HASH-ITEM?format=json';

/**
 * blockchain.info api call
 *
 * @param hash
 */
const getBlockData = hash => new Promise((resolve, reject) => request({
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

/**
 * Block 데이터
 *
 * return {
 *  hashBlock
 *  트랜잭션(tx) 수
 *  평균 트랜잭션의 값(value)
 *  평균 트랜잭션의 수수료(fee)
 *  평균 트랜잭션의 크기(size)
 * }
 *
 * @param hash
 */
exports.getBlockInfo = hash => getBlockData(hash)
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
 * tx inputs or output data 반환
 *
 * return {
 *  row_cnt: 배열의 길이
 *  input or output: tx의 input 혹은 output 정보
 * }
 *
 * @param hash
 * @param txIo
 */
exports.getBlockTxIoInfo = (hash, txIo) => getBlockData(hash)
  .then(data => {
    if (txIo !== 'input' && txIo !== 'output') {
      throw `txId: ${txIo} - invalid option`;
    }

    return txIo === 'input' ?
      getBlockInputsInfo(data) :
      getBlockOutputInfo(data);
  });

/**
 * Block Data - inputs 데이터 가져오기
 *
 * @param data
 */
const getBlockInputsInfo = data => {
  const inputs = data.tx.map(tx => {
    return tx.inputs;
  });

  return {
    row_cnt: inputs.length,
    input: inputs
  };
};

/**
 * Block Data - out 데이터 가져오기
 *
 * @param data
 */
const getBlockOutputInfo = data => {
  const out = data.tx.map(tx => {
    return tx.out;
  });

  return {
    row_cnt: out.length,
    output: out
  };
};