id=$1
echo $id > info.txt
mkdir /project
service apache2 start
touch /project/index.js
pm2 start /kide/server.js --name kide
cd /project
pm2 start ../kide/terminal/unique.py --name terminal
/index
