FROM openjdk:11-jdk-slim AS build
WORKDIR /build

RUN apt-get update && apt-get install -y protobuf-compiler

COPY . .
RUN ./gradlew shadowJar

FROM openjdk:11-jre-slim AS run

COPY --from=0 /build/build/libs/api-0.0.1.jar  /app/api.jar

CMD ["java", "-server", "-XX:+UnlockExperimentalVMOptions", "-XX:InitialRAMFraction=2", "-XX:MinRAMFraction=2", "-XX:MaxRAMFraction=2", "-XX:+UseG1GC", "-XX:MaxGCPauseMillis=100", "-XX:+UseStringDeduplication", "-jar", "/app/api.jar"]
