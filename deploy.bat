#!/bin/bash

SET HOME_DIR=%USERPROFILE%
SET VPS_KEY=%HOME_DIR%\.ssh\id_contabo
SET VPS_USER=root
SET VPS_IP=80.241.216.147
SET TAR_FILE_NAME=crescentcoder.tar.gz

del /s /f %TAR_FILE_NAME%
tar -cf %TAR_FILE_NAME% public views server.js package.json
scp -i %VPS_KEY% %TAR_FILE_NAME% %VPS_USER%@%VPS_IP%:/var/www/html/%TAR_FILE_NAME%
del /s /f %TAR_FILE_NAME%
ssh -i %VPS_KEY% %VPS_USER%@%VPS_IP% "sudo bash -s" < server.sh