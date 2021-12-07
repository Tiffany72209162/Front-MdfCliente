FROM node:10 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV GENERATE_SOURCEMAP=false
RUN yarn build

# Stage 2 - the production environment
FROM devmakk/docker-nginx-brotli:1.17.0-alphine-3.10
COPY --from=build-deps /app/build /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]