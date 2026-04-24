FROM php:7.4-apache

# Install required packages
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mysqli zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Clone TestLink source
WORKDIR /var/www/html
RUN git clone https://github.com/TestLinkOpenSourceTRMS/testlink-code.git . \
    && git checkout 1.9.20

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port
EXPOSE 80
