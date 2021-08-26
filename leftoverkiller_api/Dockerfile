FROM node:14
COPY . /app
WORKDIR /app
RUN npm install
RUN npm install cors
RUN npm install http-errors
EXPOSE 3000
# CMD ["node", "app.js"]

# CMD ["./wait_for_db.sh", "test_mysql", "node", "app.js"]