FROM oven/bun:1 AS base
WORKDIR /usr/

RUN mkdir -p /server && mkdir -p /server/app
COPY ./server/package.json ./server/bun.lockb ./server/server.ts server/
COPY ./server/app server/app
RUN cd server && bun install --production

EXPOSE 3000

CMD ["bun", "run", "/usr/server/server.ts"]

