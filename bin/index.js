const {getBlockInfo, getBlockTxIoInfo} = require('./block');

const hash = '0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103';

const step1 = getBlockInfo(hash);
const step2 = getBlockTxIoInfo(hash, 'input');
const step3 = getBlockTxIoInfo(hash, 'output');

step1
  .then(data => {
    console.log('요구사항 1. "블록 해쉬 값"을 Argument로 전달 받아서 아래의 정보를 출력\n');
    console.log('\t트랜잭션(tx) 수         \t:', data.n_tx);
    console.log('\t평균 트랜잭션의 값(value) \t:', data.avg_value);
    console.log('\t평균 트랜잭션의 수수료(fee) \t:', data.fee);
    console.log('\t평균 트랜잭션의 크기(size) \t:', data.avg_size);
    console.log('\n');
  })
  .then(_ => step2)
  .then(data => {
    console.log('요구사항 2. "블록 해쉬 값과 input or output"을 Argument로 받아서, input 혹은 output의 정보만 출력\n');
    console.log('input --------------------------------------------------------------------------------');
    console.log(JSON.stringify(data));
    console.log('--------------------------------------------------------------------------------------');
    console.log('\n');
  })
  .then(_ => step3)
  .then(data => {
    console.log('요구사항 2. "블록 해쉬 값과 input or output"을 Argument로 받아서, input 혹은 output의 정보만 출력\n');
    console.log('output --------------------------------------------------------------------------------');
    console.log(JSON.stringify(data));
    console.log('--------------------------------------------------------------------------------------');
  })
  .catch(err => console.log(err));
