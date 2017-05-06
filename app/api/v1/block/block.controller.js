const {
  success200RetObj, error404NotFound
} = require('../../../util/return.msg');
const {getBlockData, getBlockTxIoData} = require('./block.util');

/**
 * 요구사항 1
 *    => "블록 해쉬 값"을 Argument로 전달 받아서 아래의 정보를 출력
 *    => output
 *      - 트랜잭션(tx) 수
 *      - 평균 트랜잭션의 값(value)
 *      - 평균 트랜잭션의 수수료(fee)
 *      - 평균 트랜잭션의 크기(size)
 *
 * @param req
 * @param res
 */
exports.show = (req, res) => getBlockData(req.params.blockHash)
  .then(data => success200RetObj(res, data))
  .catch(_ => error404NotFound(res));

/**
 * 요구사항 2
 *    => "블록 해쉬 값과 input or output"을 Argument로 받아서,
 *       input 혹은 output의 정보만 출력
 *
 *    ! 즉, [블록 해쉬 값] input 형태로 Argument를 전달하게 되면 트랜잭션 내용 중
 *      inputs에 관한 내용만 출력
 *
 * @param req
 * @param res
 */
exports.showTxIo = (req, res) => {
  const {blockHash, txIo} = req.params;

  if (txIo !== 'input' && txIo !== 'output') {
    return error404NotFound(res);
  }

  getBlockTxIoData[txIo](blockHash)
    .then(data => success200RetObj(res, data))
    .catch(_ => error404NotFound(res));
};