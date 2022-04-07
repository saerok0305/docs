# Maven에서 Spring Boot 설정

## Spring Boot Application을 Maven Dependency로 Import하기

자바 프로젝트를 Maven multi-module 프로젝트로 만들면서 Parent-Child 구조로 사용하는 경우가 많은데,
이때 각 Child 모듈을 Spring Boot 프로젝트로 사용하는 경우가 많았다.

문제는 각 child 모듈끼리 의존성을 가져야하는 경우가 있을 때, pom.xml에 다른 (Spring Boot 프로젝트로 만들어진) child 모듈을 dependency로 추가하면 정상적으로 해당 모듈을 참조할 수 없게 된다.

이것은 보통 Spring Boot Application은 `spring-boot-maven-plugin`이라는 플러그인으로 빌드를 하게 되는데, `spring-boot:repackage`라는 goal의 도움으로 프로젝트에서 컴파일 된 JAVA 클래스 뿐 만 아니라 Spring Boot Application을 실행하는데 필요한 모든 런타임 라이브러리를 포함하게 된다. 하지만 이렇게 `spring-boot-maven-plugin`에 의해 빌드된 JAR 파일이 Maven이 빌드한 JAR를 말 그대로 repackage했기 때문에 이 JAR 파일을 다른 모듈에서 dependency로 추가해도 기대한 패키지들을 로드할 수 없게 된다.

> 디테일한 메커니즘은 더 공부가 필요하다

그래서 많은 삽질 끝에 찾아낸 방법은 `maven-jar-plugin`을 이용해서 import 가능한 JAR 파일을 별도로 빌드하는 것이다.
