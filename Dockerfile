FROM node:22.2.0-bullseye

  ENV WORKDIR=/app

  RUN mkdir -p $WORKDIR

  WORKDIR $WORKDIR

  COPY . $WORKDIR

  RUN npm i
  RUN npm i -g serve@14.2.4
  RUN npm run build
  