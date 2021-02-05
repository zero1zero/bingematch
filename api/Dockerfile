FROM openjdk:11-jdk-slim AS build
WORKDIR /build

COPY . /build

RUN ./gradlew shadowJar

FROM openjdk:11-jre-slim AS run
WORKDIR /app

#ENV APPLICATION_USER ktor
#RUN adduser -D -g '' $APPLICATION_USER

#RUN chown -R $APPLICATION_USER /app

#USER $APPLICATION_USER

COPY --from=0 /build/build/libs/api-0.0.1.jar  /app/api.jar

CMD ["java", "-server", "-XX:+UnlockExperimentalVMOptions", "-XX:InitialRAMFraction=2", "-XX:MinRAMFraction=2", "-XX:MaxRAMFraction=2", "-XX:+UseG1GC", "-XX:MaxGCPauseMillis=100", "-XX:+UseStringDeduplication", "-jar", "/app/api.jar"]
