FROM node:20.11.0

# 작업 디렉토리 설정
WORKDIR /app

# 현재 디렉토리의 모든 파일과 서브 디렉토리를 이미지의 /app 디렉토리로 복사
COPY . .

# 기존에 있던 package-lock.json을 삭제해서
# 이미지 빌드 시점의 최신 종속성을 가진 새로운 package-lock.json 파일을 생성하는 것이 목적이다.
# 만약 package-lock.json 파일이 이미 삭제된 상태라면 rm 명령어는 실패하지만,
# || true 때문에 빌드 과정이 중단되지 않고 계속될 수 있다.
RUN rm package-lock.json || true

# 패키지를 설치하면서 새로운 package-lock.json 파일이 생성된다.
RUN npm install

# 프로젝트 빌드
RUN npm run build

# ENV 명령어는 Docker 컨테이너가 실행될 환경 변수를 설정하는데 사용.
# ENV HOST 0.0.0.0은 환경 변수 HOST를 0.0.0.0으로 설정.
# 모든 네트워크 인터페이스에서 접속을 허용하겠다는 의미.
# 이 주소에서 호스팅되는 서비스는 도커 컨테이너를 실행하는 호스트 머신의 모든 IP주소에서 접속이 가능해진다.
ENV HOST 0.0.0.0

# Docker 컨테이너가 리스닝할 포트를 선언하는데 사용된다.
# 컨테이너가 8081 포트에서 서비스를 제공한다는 것을 의미한다.
# 이미지를 실행하는 사람에게 해당 컨테이너가 8081 포트에서 서비스를 제공한다는 정보를 제공한다.
EXPOSE 8081

CMD [ "npm", "run", "dev" ]

