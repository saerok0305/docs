# 리액트로 블로그 만들기

> 블로그 해보려다 취향에 맞는 템플릿이 없어서 직접 만들어 봤습니다.

## 템플릿을 만들면서 결정한 것들...

- 내가 쉽게 커스터마이징 가능해야 한다.
  - 그래서 조금씩 공부해 본, React로 만들었음
- markdown을 이용해서 작성한다.
  - react-markdown 이용
- Github Pages로 호스팅 한다.
- CSR로 충분하지 않을까. SSR은 고려 하지않는다.
  - CRA로 만든 순수 React 프로젝트 (Next.js나 Gatsby 써본 적 없음)
  - react-router-dom 활용
  - 찾아보니, react-snap을 이용하여 정적 페이지 생성 가능해서
  - react-helmet으로 메타 정보 관리
- Google ads도 적용 해 볼 예정
- Google Analytics도 적용 해 볼 예정
- Github를 통해 소스 코드 공개
- 내가 만든 템플릿으로, 템플릿 사용법을 문서화 하기로 함
