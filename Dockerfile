FROM node:carbon-slim

# Create app directory
WORKDIR /firts-app

# Install app dependencies
COPY package.json /firts-app/
RUN npm install

# Bundle app source
COPY . /firts-app/
RUN npm start

CMD [ "npm", "run", "runServer" ]
