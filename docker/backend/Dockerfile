
FROM php:8.4-fpm

# 作業ディレクトリ
WORKDIR /var/www/html


COPY ./backend .

# 必要なパッケージと拡張
RUN apt-get update && apt-get install -y \
    zip unzip curl \
    && docker-php-ext-install pdo pdo_mysql

# Composer インストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install
