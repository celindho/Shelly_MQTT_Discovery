FROM node:20.9

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY *.js ./
COPY models/*.js ./models/

ENV config_folder="/config"

CMD ["node", "index.js"]
