FROM node:lts
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY src ./src
COPY tsconfig.json ./
RUN pnpm run build
RUN pnpm install --prod
EXPOSE 3000
CMD [ "node", "dist/server.js" ]
