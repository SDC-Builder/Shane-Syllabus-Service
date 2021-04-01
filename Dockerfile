FROM node:14-alpine
WORKDIR /jsmithSyllabusesService
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]