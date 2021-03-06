# 컨텐츠 기반 알고리즘

일단 생각나는 대로 정리

- 사용자가 과거에 경험했던(높은 평점을 매겼던) 아이템과 비슷한 아이템을 현재 시점에 추천
    - 영화: 같은 베우, 장르, 영화 감독
    - 뉴스: 비슷한 뉴스
- *****유사성을 어떻게 측정하느냐가 관건
- 장점
    - *****다른 유저 데이터가 필요 없음
    - 추천 할 수 있는 아이템의 범위가 넓음
    - 추천하는 이유 설명 가능
- 단점
    - **********비슷한 아이템만 추천
    - 피쳐 찾기 어려움
    - 새로운 유저를 위한 추천이 어렵다 (한번도 영화를 본 이력이 없기 때문?)
        - User Profile이 없음
    - 선호하는 특성을 가진 항목을 반복 추천함
- 아키텍쳐
    - 정보(유저, 아이템) 제공
    - 컨텐츠 분석
        - Item Profile
            - *****아이템 분석 알고리즘
                - 클러스터링
                - 기계학습
                - TF/IDF
        - User Profile
            - 사용자가 가지고 있는 아이템 특성의 가중치 활용
            - ******각 유저는 영화 X 자질 테이블(좋아요)을 가지고 있다

    - 벡터 표현, feature extraction
        - 해당 영화를 설명하는 장르를 이용하여 표현 + 영화 댓글을 이용하여 표현
    - 유저 프로필 파악
        - 유저가 선호하는 아이템, 취향 파악
    - 유사한 아이템 선택
        - K-Nearest Neighbor 알고리즘
            - 분류: 가까운 K개 중에서 과반수로 분류
                - 각 아이템이 좋아요 인지 싫어요인지에 따라
            - 회귀: 가까운 K개의 평균값을 대표값으로 활용
        - 나이브 베이즈 분류기
            - 사용자 선호 영화 목록의 자질을 통해서
                - P(C) 및 P(X|C)를 학습 
                    - X: 어떤 유저가 좋아하는 영화의 자질, 예)  영화 감독, 장르, 등
                    - C: 좋아요 / 싫어요 ??
        - TF/IDF
            - 리뷰 이용할때, 리뷰를 텀 벡터로 나타냄 
    - *****적용 방법
        - *****영화 벡터: 해당 영화를 설명하는 장르를 이용하여 표현 + 영화 댓글을 이용하여 표현
        - 모든 영화에 대해 벡터 간 유사도 측정 (cossim)
        - **********사용자가 본 영화와 다른 영화와의 유사도 매트릭스 추출 (n, 1000) X 사용자가 본 영화의 평점 벡터 (가중치) (n, 1)
            - 이 매트릭스의 열은, 임의의 영화에 대한, 특정 사용자의 선호도 백터
                - (자기가 본 영화와의 유사도를 기반으로 벡터로 표현되었기 때문)
            - 해당 유저가 본 영화의 평점 벡터를 곱함 (가중치 역할)
                - (1000, n) x (n, 1) = (1000, 1)
                - 이 벡터에서 값이 큰 영화를 추천하면 됨!!!!!