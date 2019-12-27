/bin/cat <<EOM >/etc/nginx/sites-available/$APP_FOLDER
server {
    server_name crescentcoder.com www.crescentcoder.com;
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

wget https://dl.eff.org/certbot-auto
chmod a+x ./certbot-auto
mv certbot-auto /usr/local/bin

sudo certbot-auto --nginx -d crescentcoder.com -d www.crescentcoder.com