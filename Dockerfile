FROM node:18.17.0

WORKDIR /home/nextEditServer

COPY . /home/nextEditServer/

RUN npm install 

CMD node --version

CMD npm run build 

CMD npm run start

EXPOSE 3001