const should = require('should');
const request = require('request');
const {getBlockInfo, getBlockTxIoInfo} = require('../bin/block');

describe('Block 확인 API ', _ => {
  const hash = '0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103';
  const url = `https://blockchain.info/block-index/${hash}?format=json`;
  const failUrl = `https://blockchain.info/block-index/fail?format=json`;

  it('Block 확인 - 1 - APi 실행하여 데이터 가져오기 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);

      res.statusCode.should.be.equal(200);
      result.hash.should.be.equal(hash);

      done();
    });
  });

  it('Block 확인 - 2 - 데이터 가져오기 함수 테스트 ', done => {
    getBlockInfo(hash).then(data => {
      data.hash.should.be.equal(hash);

      done();
    });
  });

  it('Block 확인 - 3 - Api 실행하여 input data 출력 테스트 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);
      const inputs = result.tx.map(tx => {
        return tx.inputs
      });

      res.statusCode.should.be.equal(200);
      inputs.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 - 4 - Api 실행하여 output data 출력 테스트 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);
      const output = result.tx.map(tx => {
        return tx.out
      });

      res.statusCode.should.be.equal(200);
      output.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 - 5 - input data 가져오기 함수 테스트 ', done => {
    getBlockTxIoInfo(hash, 'input').then(data => {
      data.row_cnt.should.be.not.equal(0);
      data.input.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 - 6 - output data 가져오기 함수 테스트 ', done => {
    getBlockTxIoInfo(hash, 'output').then(data => {
      data.row_cnt.should.be.not.equal(0);
      data.output.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 - 7 - Api 실행하여 데이터 가져오기 실패 테스트', done => {
    request({
      url: failUrl
    }, (err, res, body) => {
      res.statusCode.should.be.equal(500);
      body.should.be.equal('Invalid Block Hash');

      done();
    });
  });

  it('Block 확인 - 8 - 데이터 가져오기 함수 실패 테스트 ', done => {
    getBlockInfo('fail')
      .then(data => {})
      .catch(err => {
        err.should.be.equal('Invalid Block Hash');

        done();
      });
  });
});