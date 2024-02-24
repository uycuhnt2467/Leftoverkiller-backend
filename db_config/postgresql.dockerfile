FROM postgres:latest

COPY leftoverkiller_db_postgresql.sql /docker-entrypoint-initdb.d

ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

EXPOSE 3306

