# 뉴스 토이 프로젝트

## 뉴스 토픽
> 리소스 문제로 많이 느리지만, 기다리면 되긴 됨

### 작업 내용
1. 네이버 뉴스 크롤링
2. 뉴스 클러스터링 / 색인
3. 뉴스 검색 / 이벤트 탐지 / 토픽 모델링
4. 연관 키워드

### 관린 기술
- 백엔드
    - Python: selenium, sqlalchemy, JAVA, JPA, Spring Boot
- 프론트엔드
    - React 
- 문서 유사도 측정
    - Jaccard Similarity
    - Logistic Regression: Pytorch
- 토픽 모델링
    - JAVA로 자체 구현
        - [Latent Dirichlelt Allocation](/docs/research/topic-modeling/lda) / [Hierararchical Dirichlelt Process](/docs/research/topic-modeling/hdp) 
- 연관키워드
    - Pointwise Mutual Information
- Elasticsearch
- MySQL

### 인프라
- Ubuntu: 개인 mini server (너무 느리다)