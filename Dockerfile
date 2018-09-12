FROM node:8-slim as node

ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
#RUN npm install -g yarn
#RUN yarn global add serve

WORKDIR /app

COPY package.json /app/package.json

#ENV NODE_PATH=/node_modules
#ENV PATH=$PATH:/node_modules/.bin


#COPY public, src, package.json

RUN yarn install

COPY . /app 

RUN yarn build

FROM nginx:1.14

COPY --from=node /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# start envoy and then ngnix
#CMD ["nginx"]

#CMD serve -s /app/build

#WORKDIR /app
#ADD . /app


#RUN npm -g install serve or ngnix?

#CMD serve -s build


#EXPOSE 3000
#EXPOSE 35729

#ENTRYPOINT ["/bin/bash", "/app/run.sh"]
#CMD ["start"]