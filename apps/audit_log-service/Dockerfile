FROM node:20 as development 

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

COPY packages ./packages
COPY apps ./apps

RUN pnpm install --no-frozen-lockfile 
RUN pnpm --filter=audit_log-service install 

EXPOSE 3005

CMD [ "pnpm", "run", "dev", "--filter=audit_log-service" ]