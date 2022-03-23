# 사용법

> 내 블로그 템플릿 설치와 사용법

## Prerequsite

- [React 개발 환경 구축](/docs/development/react)
- 블로그 템플릿 설치하기
- Github 계정 (Github Pages를 통한 호스팅의 경우)

## 블로그 템플릿 설치 및 실행

### 1. React 프로젝트(템플릿) 내려받기

다음 명령어를 실행하면 react-simple-documentation라는 디렉토리에 리액트 프로젝트가 다운로드 됨

```sh
$ git clone https://github.com/saerok0305/react-simple-documentation.git
```

### 2. 내려받은 React 프로젝트 디렉토리에서 package.json에 등록된 의존성 설치

cd 명령어로 react-simple-documentation 디렉토리로 이동하고 yarn 명령어를 실행하여 필요한 의존성을 설치

```sh
$ cd react-simple-documentation
$ yarn
```

### 3. 리액트 앱(블로그 템플릿) 실행

아래 명령어는 개발 서버를 실행하고 브라우저에 [http://localhost:3000/react-simple-documentation](http://localhost:3000/react-simple-documentation)이 열리면서 블로그 템플릿을 실행시킨다.

```sh
$ yarn start
```

실행하면 아래와 같은 블로그 템플릿이 브라우저에 나타난다.

<img width="800" src="/docs/assets/project/react-simple-documentation/how-to-use-blog/desktop.JPG" />
<figcaption align="center">
  <b>블로그 템플릿 (데스크탑 환경)</b>
</figcaption>

모바일에서는 다음과 같은 모습이다.

<div class="flex">
<img width="200" src="/docs/assets/project/react-simple-documentation/how-to-use-blog/mobile1.JPG" />
<img width="200" src="/docs/assets/project/react-simple-documentation/how-to-use-blog/mobile2.JPG" />
</div>

<figcaption align="center">
  <b>블로그 템플릿 (모바일 환경)</b>
</figcaption>

github pages 호스팅

respository 이름
basepath
packages.json hompage
