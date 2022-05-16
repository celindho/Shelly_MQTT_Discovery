FROM arm32v7/node:14.19.0

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY *.js ./

ENV config_folder="/config"

CMD ["node", "index.js"]
