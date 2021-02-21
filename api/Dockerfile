FROM openjdk:11-jre-slim AS run

COPY build/libs/api-0.0.1.jar  /app/api.jar

CMD ["java", "-server", "-XX:+UnlockExperimentalVMOptions", "-XX:InitialRAMFraction=2", "-XX:MinRAMFraction=2", "-XX:MaxRAMFraction=2", "-XX:+UseG1GC", "-XX:MaxGCPauseMillis=100", "-XX:+UseStringDeduplication", "-jar", "/app/api.jar"]
