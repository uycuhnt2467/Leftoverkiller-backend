#!/bin/bash

set -e
set -x

host="$1"
db_user="$2"
db_password="$3"
db="$4"
container="$5"
shift
shift
shift
shift
shift
cmd="$@"

# until mysql -h "$host" -u "$db_user" -p "$db_password" "$db" -e 'select 1'; do
#   >&2 echo "MySQL is unavailable - sleeping"
#   sleep 1
# done

# >&2 echo "Mysql is up - executing command"
# test_sql="\'SELECT 1\'"
# while ! docker exec $container mysql --user=$db_user --password=$db_password --database=$db --execute=$test_sql >/dev/null 2>&1; do
#     sleep 1
# done
sleep 10
exec $cmd