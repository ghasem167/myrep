FROM node:alpine AS node-builder

WORKDIR /backend

COPY tsconfig.json .

FROM registry.heroiclabs.com/heroiclabs/nakama:latest

COPY --from=node-builder /backend/*.js /nakama/data/modules/
COPY local.yml .
