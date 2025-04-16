FROM node:20-alpine as build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

RUN npm install

# Копируем остальные файлы
COPY . .

RUN npm run build

FROM nginx:1.24.0-alpine

# Копируем собранные файлы в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
