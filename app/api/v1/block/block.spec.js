const supertest = require('supertest');
const should = require('should');
const app = require('../../../index');
const request = require('request');
const {getBlockData, getBlockInputsData, getBlockOutputData} = require('./block.util');

describe('Block 확인 API ', _ => {
  const hash = '0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103';
  const url = `https://blockchain.info/block-index/${hash}?format=json`;
  const failUrl = `https://blockchain.info/block-index/fail?format=json`;

  it('Block 확인 API - 1 - 데이터 가져오기 테스트 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);

      res.statusCode.should.be.equal(200);
      result.hash.should.be.equal(hash);

      done();
    });
  });

  it('Block 확인 API - 2 - 데이터 가져오기 함수 테스트 ', done => {
    getBlockData(hash).then(data => {
      data.hash.should.be.equal(hash);

      done();
    });
  });

  it('Block 확인 API - 3 - input data 출력 테스트 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);
      const inputs = result.tx.map(tx => {
        return tx.inputs
      });

      inputs.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 API - 4 - output data 출력 테스트 ', done => {
    request({url}, (err, res, body) => {
      const result = JSON.parse(body);
      const output = result.tx.map(tx => {
        return tx.output
      });

      output.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 API - 5 - input data 가져오기 함수 테스트 ', done => {
    getBlockInputsData(hash).then(inputs => {
      inputs.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 API - 6 - output data 가져오기 함수 테스트 ', done => {
    getBlockOutputData(hash).then(output => {
      output.should.be.not.equal([]);

      done();
    });
  });

  it('Block 확인 API - 7 - 데이터 가져오기 실패 테스트', done => {
    request({
      url: failUrl
    }, (err, res, body) => {
      res.statusCode.should.be.equal(500);
      body.should.be.equal('Invalid Block Hash');
      done();
    });
  });
});

describe('Block API - GET /api/v1/block ', () => {
  const apiVersion = 'v1';
  const apiRoot = `/api/${apiVersion}`;
  const hash = '0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103';

  it('api : /:blockHash - 200 성공 ', (done) => {
    supertest(app)
      .get(`${apiRoot}/block/${hash}`)
      .end((err, res) => {
        res.statusCode.should.be.equal(200);
        res.body.hash.should.be.equal(hash);

        done();
      });
  });
});
