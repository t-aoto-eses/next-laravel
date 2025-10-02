FROM node:lts

# workdirの設定
WORKDIR /var/www/html

# package.json と package-lock.json を先にコピー
COPY ./frontend/package*.json ./

# npm install の実行
RUN npm install

# 残りのソースをコピー
COPY ./frontend ./
