# 뉴스 토이 프로젝트

## 주요 뉴스 탐지
> 개인 서버 = 느림

### 작업 내용
1. 네이버 뉴스 크롤링 및 전처리 (형태소 분석만)
2. 뉴스 클러스터링 / 색인
3. 뉴스 검색 / 이벤트 탐지 / 토픽 모델링
4. 연관 키워드 (사용자 활동 로그가 없으므로 오로지 뉴스 분석만으로)

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