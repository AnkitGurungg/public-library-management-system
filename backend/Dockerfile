# === Stage 1: Build Stage ===
FROM maven:3.9.0-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy only pom.xml first for caching dependencies
COPY pom.xml .

# Download all dependencies to local Maven repository inside Docker image
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the Spring Boot jar
RUN mvn clean package -DskipTests

# === Stage 2: Runtime Stage ===
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Injects an environment variable inside container and is accessible at runtime
#ENV SPRING_PROFILES_ACTIVE="prod"

# Entry point to run the jar
ENTRYPOINT ["java","-jar","app.jar"]
