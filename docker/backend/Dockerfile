
FROM php:8.4-fpm

# 作業ディレクトリ
WORKDIR /var/www/html

# 必要なパッケージ・拡張・Xdebug を一括インストール
RUN apt-get update && apt-get install -y \
    zip unzip curl git \
    && docker-php-ext-install pdo pdo_mysql \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Composer インストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# php.ini をコピー（xdebug 設定用）
COPY ./docker/backend/php.ini /usr/local/etc/php/conf.d/php.ini

