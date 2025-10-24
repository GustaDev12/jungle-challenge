FROM node:20 as development

WORKDIR /app

RUN corepack enable # Enable corepack
RUN corepack prepare pnpm@latest --activate 

COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

COPY packages ./packages
COPY apps/frontend ./apps/frontend

RUN pnpm install --frozen-lockfile
WORKDIR /app/apps/frontend

EXPOSE 3000

CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]