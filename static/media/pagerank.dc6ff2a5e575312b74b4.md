# PageRank

PageRank는 상당히 직관적이고 간단하게 이해할 수 있는 개념이지만 상당히 많은 연구자에 의해 파헤쳐진? 사실들이 많이 있다. 그 중 중요하다고 생각하는 부분들에 대해서 소개하려고 한다.

<img width="400" src="/docs/assets/research/pagerank/pagerank.png" />
<figcaption align="center">
  <b>그림1: PageRank (출처: 위키피디아)</b>
</figcaption>

graph theory에서 graph상에서 node의 증요도를 측정하는 것은 상당히 중요한 부분이다. 이것을 centrality를 측정한다라고 하는데, PageRank는 웹이라는 거대한 그래프 상에 존재하는 페이지 하나하나를 node로 하여 node의 eigenvector centrality를 측정하는 방식이라고 할 수 있다. 이 부분에 대해 설명하기 전에 먼저 PageRank 자체에 대해 알아보기로 하자.

PageRank는 다음과 같은 가정으로 웹페이지의 중요도를 계산한다.
1. 다른 페이지로 이동할 수 있는 link를 많이 포함하고 있는(outbound link가 많은) 페이지는 상대적으로 중요도가 낮다
    - 예를 들면, sitemap을 담고 있는 페이지나, 포털과 같은 페이지는 다른 페이지로 건너 가기 위한 수단이 되는 페이지이므로 상대적으로 중요한 정보를 담고 있지 않다고 가정한다.
2. 다른 페이지의 link로 부터 유입되기 쉬운(inbound link가 많은) 페이지는 상대적으로 중요도가 높다.
    - 전문적인 지식을 담고 있는 블로그나 중요한 뉴스 기사는 다른 페이지로부터 참조될 소지가 많다.

이러한 가정을 담은 식을 아래와 같이 표현 할 수 있다.

$$
PR(u) = \sum_{v \in B_u} \frac{PR(v)}{L(v)},
$$

- $$PR(u)$$: 페이지 u의 중요도 (u의 페이지랭크 값)
- $$B_u$$: 페이지 u로 link를 가진 모든 페이지 집합
- $$L(v)$$: 페이지 v의 outbound link 수

따라서 페이지 u의 중요도, $$PR(u))$$는 페이지 u로의 link를 가지고 있는 모든 페이지 v의 중요도, $$PR(v))$$의 합산으로 (단, $$L(v)$$로 나누는 방식으로 패널티를 주어) 표현한다.

하지만 PageRank의 실제 식은 다음과 같은데,

$$
PR(p_i) = \frac{1-d}{N} + d \sum_{p_j \in M(p_i)} \frac{PR (p_j)}{L(p_j)}
$$

- $$N$$: 전체 페이지 수

<figcaption align="center">
  <b>식1: PageRank Equation</b>
</figcaption>

이는 페이지 $$p_i$$의 중요도, $$PR(p_i)$$ 값은 $$\cfrac 1 N$$과 $$\sum_{p_j \in M(p_i)} \frac{PR (p_j)}{L(p_j)}$$을 $$ 1-d : d $$의 비율로 가중합 하여 계산하였다.

어쩌면 이 부분 때문에 PageRank가 이론적으로 굉장히 탄탄한 배경을 가지고 있다고 볼 수 있는데, 좀 더 자세한 해석을 위해 위 식을 다음과 같이 행렬 표현식으로 바꾸어 보자.



$$
\begin{bmatrix}
PR(p_1)^{(i+1)} \\
PR(p_2)^{(i+1)} \\
\vdots \\
PR(p_N)^{(i+1)}
\end{bmatrix} =
\begin{bmatrix}
{(1-d)/ N} \\
{(1-d) / N} \\
\vdots \\
{(1-d) / N}
\end{bmatrix}
+ d
\begin{bmatrix}
\ell(p_1,p_1) & \ell(p_1,p_2) & \cdots & \ell(p_1,p_N) \\
\ell(p_2,p_1) & \ddots &  & \vdots \\
\vdots & & \ell(p_i,p_j) & \\
\ell(p_N,p_1) & \cdots & & \ell(p_N,p_N)
\end{bmatrix}
\begin{bmatrix}
PR(p_1)^{(i)} \\
PR(p_2)^{(i)} \\
\vdots \\
PR(p_N)^{(i)}
\end{bmatrix}
$$

- $$PR(p)^{i}$$: i번째 iteration에서의 페이지 p의 패이지랭크 값
- $$\ell(p_i, p_j)$$: 페이지 j에서 페이지 j로의 outbound link 갯수 / 페이지 j의 총 outbound link 갯수 $$\bigg(\sum_{i = 1}^N \ell(p_i,p_j) = 1\bigg)$$

위와 같이 표현 했을 때 알 수 있는 중요한 사실은,

$
\mathbf{R} =
\begin{bmatrix}
PR(p_1) \\
PR(p_2) \\
\vdots \\
PR(p_N)
\end{bmatrix}
$ 은 eigenvector 라는 사실이다.

