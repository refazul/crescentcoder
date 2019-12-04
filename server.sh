#!/bin/bash

export ROOT_FOLDER='/var/www/html'
export APP_FOLDER='crescentcoder'
export TAR_FILE_NAME='crescentcoder.tar.gz'

pm2 stop server
pm2 delete server
rm -rf $ROOT_FOLDER/$APP_FOLDER/*
mv $ROOT_FOLDER/$TAR_FILE_NAME $ROOT_FOLDER/$APP_FOLDER/$TAR_FILE_NAME
cd $ROOT_FOLDER/$APP_FOLDER
tar -xf $TAR_FILE_NAME
npm install --save
rm -rf $TAR_FILE_NAME
chown -R www-data:www-data .
pm2 start server.js

/bin/cat <<EOM >/etc/nginx/sites-available/$APP_FOLDER
server {
    server_name crescentcoder.com;
    location / {
        proxy_pass http://127.0.0.1:8001/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    location ~ /\.ht {
        deny all;
    }
}
EOM

ln -s /etc/nginx/sites-available/$APP_FOLDER /etc/nginx/sites-enabled/$APP_FOLDER
sudo service nginx restart