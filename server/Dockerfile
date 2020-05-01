FROM node:10.15.0

WORKDIR /opt/

COPY package*.json ./

RUN yarn install
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD yarn start 