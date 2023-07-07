# Use a base image that includes Maven and Java
FROM maven:3.8.4-openjdk-11-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file to the container
COPY pom.xml .

# Download the project dependencies
RUN mvn dependency:go-offline

# Copy the project source code to the container
COPY src ./src

# Build the application
RUN mvn package -DskipTests

# Use a lightweight base image for running the application
FROM openjdk:11-jre-slim

# Copy the JAR file from the build stage to the container
COPY --from=build /app/target/*.jar /app.jar

# Specify the command to run your application
CMD ["java", "-jar", "app.jar"]
