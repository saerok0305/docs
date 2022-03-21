# 사용법

> 내 블로그 템플릿 설치와 사용법

## Prerequsite

- React 개발 환경 구축
- 블로그 템플릿 설치하기
- Github 계정 (Github Pages를 통한 호스팅의 경우)

## React 개발 환경 구축

### 1. node.js 설치

#### 1.1 Linux or Mac OS 환경

[nvm](https://github.com/nvm-sh/nvm)을 설치 스크립트 다운로드 및 실행

```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

nvm을 이용한 Node.js 설치

```sh
$ nvm install --lts
```

#### 1.2 Windows 환경

[Node.js 공식 홈페이지](https://nodejs.org/en/) 참고
윈도우 환경에서는 [Git for Windows](https://gitforwindows.org/)를 설치하고 Git Bash를 통해 아래 명령어를 사용한다.

### 2. yarn 설치

npm(Node.js의 패키지 관리자)을 이용하여 yarn 설치

```sh
$ npm install --global yarn
```

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
아래 명령어는 개발 서버를 실행하고 브라우저에 [http://localhost:3000/](http://localhost:3000/)이 열리면서 블로그 템플릿을 실행시킨다.

```sh
$ yarn start
```


