const {
  success200RetObj, error404NotFound
} = require('../../../util/return.msg');
const {getBlockData, getBlockInputsData, getBlockOutputData} = require('./block.util');

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
exports.index = (req, res) => getBlockData(req.params.blockHash)
  .then(data => success200RetObj(res, data));