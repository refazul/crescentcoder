#!/bin/bash

export ROOT_FOLDER='/var/www/html'
export APP_FOLDER='crescentcoder'
export TAR_FILE_NAME='crescentcoder.tar.gz'

pm2 stop server
pm2 delete server
rm -rf $ROOT_FOLDER/$APP_FOLDER
mkdir -p $ROOT_FOLDER/$APP_FOLDER
mv $ROOT_FOLDER/$TAR_FILE_NAME $ROOT_FOLDER/$APP_FOLDER/$TAR_FILE_NAME
cd $ROOT_FOLDER/$APP_FOLDER
tar -xf $TAR_FILE_NAME
npm install --save
rm -rf $TAR_FILE_NAME
pm2 start server.js
chown -R www-data:www-data $ROOT_FOLDER/$APP_FOLDER