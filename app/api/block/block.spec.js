const should = require('should');
const request = require('request');

describe('Block 확인 API ', _ => {

  it('Block 확인 API 데이터 가져오기 테스트 ', done => {
    const hash = '0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103';
    const url = `https://blockchain.info/block-index/${hash}?format=json`;

    request({url}, (err, res, body) => {

      res.statusCode.should.be.equal(200);

      const result = JSON.parse(body);
      result.hash.should.be.equal(hash);

      done();
    });
  });
});