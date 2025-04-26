FROM node:lts-alpine3.21
WORKDIR /app
COPY . .
# 主项目依赖
RUN npm install
# 进入应用目录安装依赖
WORKDIR /app/resume-app
RUN npm install
EXPOSE 5173
ENTRYPOINT ["npm","run","dev"]
# 或
# yarn dev