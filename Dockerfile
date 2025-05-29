FROM node:24

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]