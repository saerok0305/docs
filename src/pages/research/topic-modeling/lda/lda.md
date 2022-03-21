# Latent Dirichlet Allocation (LDA)

> LDA는 많은 수의 문서 집합이 있을 때, 각 문서를 K개의 토픽 분포로 표현하고, 각 토픽은 V개의 단어 분포로 표현하는 모델을 만들어 낸다.

그럼 여기서 말하는 토픽(Topic)이란 뭘까?
토픽에 대해 설명하기 위해서 **LDA 모델에 대한 이해**가 필요하다.

먼저, LDA는 비지도 학습(Unsupervised Learning) 모델이다.

다시 말하면, 뉴럴넷을 기반으로 하는 딥러닝 모델처럼,
입력 값에 대한 모델의 예측 값과 실제 값(Labeled Data)의 차이를 최소화 하는 지도 학습(Supervised Learning) 모델이 아니다.

물론 최적화의 관점에서 보면 위 두가지 종류의 모델 모두 극대값 혹은 극소값을 추구하는 것은 같다.
그렇다면, Labeled Data가 필요없는 LDA는 과연 어떻게 학습이 되는 걸까? 무엇을 최적화 하는 걸까?

바로 이 지점에서 LDA 모델이란 것의 의미를 다시 한번 생각해 볼 필요가 있다.

LDA 모델에서 필요한 데이터는 단지 텍스트 데이터이다.

<img src="/docs/assets/research/topic_modeling/lda/Smoothed_LDA.png" />
<figcaption align="center">
  <b>plate notation for LDA</b>
</figcaption>

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$