FROM ubuntu:bionic
ENV DEBIAN_FRONTEND noninteractive

#grundsätzlich installation & update von paketen
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install build-essential && \
    apt-get install apt-utils -y --no-install-recommends

# installation und konfiguration apache
RUN apt-get install apache2 -y
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# installation und konfiguration PHP
RUN apt-get install php -y
RUN apt-get install php7.2-mysql

# installtion optionaler Pakete
RUN apt-get install vim -y
RUN apt-get install curl -y
RUN apt-get install git -y
RUN apt-get install ca-certificates -y
RUN apt-get install sendmail -y

# install composer
RUN curl -s https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# get config file
COPY vhosts/000-default.conf /etc/apache2/sites-available