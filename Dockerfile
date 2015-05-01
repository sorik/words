FROM ubuntu:14.04
MAINTAINER Sori Kang
RUN apt-get update
RUN apt-get install -y nodejs
RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN apt-get install -y npm
RUN npm install -g bower 

RUN apt-get install -y git git-core
 
RUN mkdir /words
COPY ./package.json /words/
COPY ./bower.json /words/
COPY ./src /words/src/

RUN cd /words; npm install; bower install --allow-root

EXPOSE 8004

CMD ["node", "/words/src/app.js"]
