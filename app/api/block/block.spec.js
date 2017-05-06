const should = require('should');
const request = require('request');
const {getBlockData} = require('./util');

describe('Block 확인 API ', _ => {

  const hash = '0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103';
  const url = `https://blockchain.info/block-index/${hash}?format=json`;

  it('Block 확인 API - 1 - 데이터 가져오기 테스트 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);

      res.statusCode.should.be.equal(200);
      result.hash.should.be.equal(hash);

      done();
    });
  });

  it('Block 확인 API - 2 - 데이터 가져오기 함수 테스트 ', done => {
    getBlockData(hash, data => {
      data.hash.should.be.equal(hash);

      done();
    });
  });

  it('Block 확인 API - 3 - input data 출력 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);
      const inputs = result.tx.map(tx => {
        return tx.inputs
      });

      inputs.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 API - 4 - output data 출력 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);
      const output = result.tx.map(tx => {
        return tx.output
      });

      output.should.be.not.equal([]);

      done();
    });
  });
});