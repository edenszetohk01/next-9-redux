# Install Stage
FROM hk01/docker-node:8-v0.1 AS installer
WORKDIR /srv

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

COPY package.json yarn.lock ./

RUN /base/scripts/token-init.sh \
    && yarn --production

COPY . .

# Builder Stage
FROM hk01/docker-node:8-v0.1 AS builder
WORKDIR /srv

ARG TRAVIS_BRANCH
ARG TRAVIS_BUILD_NUMBER
ARG TRAVIS_COMMIT
ARG TRAVIS_TIMESTAMP
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

COPY --from=installer /srv/. .

RUN echo "REACT_APP_TRAVIS_BRANCH=$TRAVIS_BRANCH" >> .env \
  && echo "REACT_APP_TRAVIS_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER" >> .env \
  && echo "REACT_APP_TRAVIS_COMMIT=$TRAVIS_COMMIT" >> .env \
  && echo "REACT_APP_TRAVIS_TIMESTAMP='$TRAVIS_TIMESTAMP'" >> .env

RUN /base/scripts/token-init.sh \
    && yarn \
    && yarn build

# Run Stage
FROM hk01/docker-node:8-v0.1

WORKDIR /srv

COPY --from=installer /srv/. .
COPY --from=builder /srv/.next ./.next

ENV PORT=3000 \
    PM2_SCRIPT=/srv/server/index.js
ENTRYPOINT ["/base/scripts/start.sh"]
