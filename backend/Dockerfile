# DEV BUILD

FROM node:18-alpine As development

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

USER node

# BUILD

FROM node:18-alpine As build

WORKDIR /app

COPY package*.json ./

COPY --from=development /app/node_modules ./node_modules

COPY . .

RUN yarn build

RUN yarn build--only=production && yarn clean --force

USER node

# PRODUCTION

FROM node:18-alpine As production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD [ "node", "dist/main.js" ]