# Базовый образ с Node.js
FROM node:14-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Используем образ Nginx для раздачи статических файлов
FROM nginx:stable-alpine

# Копируем собранное приложение из предыдущего этапа
COPY --from=0 /app/build /usr/share/nginx/html

# Изменяем порт на 2222
EXPOSE 2222

# Заменяем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
