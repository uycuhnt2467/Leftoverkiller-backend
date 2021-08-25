FROM mysql:5.7

ENV MYSQL_DATABASE <>
ENV MYSQL_ROOT_PASSWORD <>
ENV MYSQL_USER <>
ENV MYSQL_PASSWORD <>

COPY ./init.sql /docker-entrypoint-initdb.d
