# Latent Dirichlet Allocation (LDA)

> LDA는 임의의 문서를 K개의 토픽 분포로 표현하고, 각 토픽은 V개의 단어 분포로 표현하는 모델이다.

일반적으로 사람들이 글을 쓸 때는 여러가지 소재를 담아 이야기를 구성한다. 이때 이 소재가 바로 토픽모델에서 말하는 토픽(Topic) 이다.

예를들어, 신문 기자가 "애플, 아이폰 출시" 라는 제목으로 기사를 작성한다고 가정해보자. 보통 이런 기사에는 아이폰, iOS, 카메라 등 제품 혹은 기술에 대한 소재, 그리고 생산량, 수요, 판매, 실적 등 어떤 시장 상황과 관련된 소재 등 다양한 소재로 이야기가 구성된다.

이렇듯 LDA가 문서를 복수개 토픽의 mixture로 표현하고, 각 토픽을 각 토픽을 설명하는 복수개 단어의 mixture로 표한하는 것(mixture of mixture)은 상당히 자연스럽고 합리적인 것 이라고 볼 수 있다. 아래 그림이 앞서 말한 내용을 잘 나타내고 있다.

<img width="600" src="/docs/assets/research/topic_modeling/lda/dist_desc.JPG" />
<figcaption align="center">
  <b>그림1: 문서에 대한 토픽 분포와 토픽에 대한 단어 분포</b>
</figcaption>

위 그림을 좀 더 포멀하게 나타낸다면 다음과 같이 Graphical Model로 설명 할 수 있다.

## Graphical Model

> Graphical Model이란, 확률 모델을 표현하는 그래프로써 확률 변수(Random Variable)간의 상호 의존성을 나타내기 용이하고 주로 베이지안 통계에서 많이 사용된다.

<img width="600" src="/docs/assets/research/topic_modeling/lda/lda-model.png" />
<figcaption align="center">
  <b>그림 2: Latent Dirichlet Allocation</b>
</figcaption>

- $$M$$: 전체 문서의 갯수
- $$N$$: 문서 내 단어 갯수 ($$i$$ 문서는 $$N_i$$ 단어를 가짐)
- $$\alpha$$: 문서 별 토픽 분포에 대한 사전 확률 분포(prior)인 디리클레 분포의 파라미터 ($$K$$ 차원 벡터)
- $$\beta$$: 토픽 별 단어 분포에 대한 사전 확률 분포(prior)인 디리클레 분포의 파라미터 ($$V$$ 차원 벡터)
- $$\theta_i$$: 문서 $$i$$의 토픽 분포 ($$K$$ 차원 벡터)
- $$\phi_k$$: 토픽 $$k$$의 단어 분포 ($$V$$ 차원 벡터)
- $$z_{ij}$$: $$i$$문서의 $$j$$번째 단어의 토픽
- $$w_{ij}$$: $$i$$문서의 $$j$$번째 단어

## Total Probability

LDA 모델에서 모든 문서-토픽 분포 $$\Theta$$, 모든 토픽-단어 분포 $$\Phi$$, 모든 토픽 assignments $$Z$$, 코퍼스의 모든 단어 $$W$$, 그리고 주어진 하이퍼파라미터 $$\alpha$$, $$\beta$$ 의 결합 확률 분포는 다음과 같은 식으로 나타낼 수 있다. (Graphcial Model에 기반) 
<img width="600" src="/docs/assets/research/topic_modeling/lda/total-prob.png" />
<figcaption align="center">
  <b>식 1: 전체 확률 변수에 대한 결합 확률 분포</b>
</figcaption>

## Generative Story

임의의 문서는 첫번째 단어, 두번째 단어, 세번째 단어, ... 이렇게 한단어 한단어씩 씌여지는데, 각 단어는 어떤 토픽에 대한 멤버쉽을 갖는다.

다시말하면, 사람이 글을 쓸 때 단어를 하나를 선택하기에 앞서 어떤 토픽을 먼저 정하고, 그 토픽에 맞는 단어를 골라서 쓴다라고 생각을 해야한다. (이렇게 생각해야 LDA를 이해할 수 있다.) 이를 염두해 놓으면 아래에 있는 설명을 좀 더 쉽게 이해할 수 있다.

**LDA에서는 문서의 발생 과정을 다음과 같이 가정 한다.**

1. 사전 확률 분포인 디리클레 분포로부터 샘플링하여 $$\theta_i$$를 얻는다.
    - 그림 2의 초록색 점선
    - $$\theta_i \sim Dir(\alpha)$$
    - 코퍼스에 총 $$M$$개의 문서가 있으므로 $$\theta_1$$, ..., $$\theta_M$$
2. 사전 확률 분포인 디리클레 분포로 부터 샘플링하여 $$\phi_k$$를 얻는다.
    - 그림 2의 파란색 점선
    - $$\phi_k \sim Dir(\beta)$$
    - 토픽 갯수를 총 K개로 가정했으므로 $$\phi_1$$, ..., $$\phi_K$$
3. 문서 $$i$$의 각 단어가 선정되기 앞서 토픽이 선정되므로 $$\theta_i$$를 파라미터로 갖는 다항 분포로 부터 토픽 $$z_{ij}$$를 샘플링
    - 그림 2의 주황색 점선
    - $$z_{ij} \sim Multinomial(\theta_i)$$
4. 토픽 $$z_{ij}$$가 선정되면 해당 토픽에서 $$\phi_{z_{ij}}$$를 파라미터로 갖는 다항 분포로 부터 단어 $$w_{ij}$$를 샘플링
    - 그림 2의 빨간색 점선
    - $$w_{ij} \sim Multinomial(\phi_{z_{ij}})$$

> 문서의 토픽 분포, 토픽의 단어 분포 모두 다항 분포를 사용한다. 비유를 들어 설명하면, 문서가 작성된다는 것은 $$K$$개의 면이 있는 주사위를 던져 토픽을 뽑고, 뽑힌 토픽에 해당하는 ($$V$$개의 면이 있는) 다른 주사위를 던져, 단어를 뽑는 행위를 반복하는 것으로 본다.