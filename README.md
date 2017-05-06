# IO-Homework

### 작업환경
* node : v6.9.2
* 기타 - package.json 참조

### 실행
```
npm run start # 실행 명령어
npm run test # Test코드 실행 명령어
```

### 풀이

> "블록 해쉬 값"을 Argument로 전달 받아서 아래의 정보를 출력
> 
>   * 트랜잭션(tx) 수 
>       - n_tx 값을 출력
>   * 평균 트랜잭션의 값(value)
>       - value는 inputs와 out에 값이 있었지만 출력될 값은 out에 있는 값의 통계라고 판단하여 계산
>       - 트렌젝션 out 하위에 value 여러개인 경우도 있어 트렌젝션 out의 하위의 모든 value 값을 더하여 하나의 값으로 판단하여 계산
>       - 소수점 두자리까지 계산
>   * 평균 트랜잭션의 수수료(fee)
>       - 데이터에서 수수료를 나태내는 값은 하나밖에 없어서 그대로 출력
>   * 평균 트랜잭션의 크기(size)
>       - 트랜젝션(tx)의 size값의 평균을 구함
>       - 소수점 두자리까지 계산

> "블록 해쉬 값과 input or output"을 Argument로 받아서, input 혹은 output의 정보만 출력
>
>   * input or output이 아닌 다른 값일 때 에러처리
>       - message: `txId: 값 - invalid option`
>   * input은 트랜젝션의 inputs 값과 inputs의 길이를 반환
>   * output은 트렌젝션의 out 값과 out의 길이를 반환