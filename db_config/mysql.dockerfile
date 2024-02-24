FROM mysql:latest

# Environment variables
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword
ENV MYSQL_DATABASE=mydatabase

# Copy SQL script to initialize database
COPY leftoverkiller_db.sql /docker-entrypoint-initdb.d/


EXPOSE 3306