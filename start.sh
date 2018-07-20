id=$1
salt=$2
echo $id > info.txt
echo $salt > salt.txt
mkdir /project
service apache2 start
touch /project/index.js
pm2 start /kide/server.js --name kide
cd /project
pm2 start ../kide/terminal/unique.py --name terminal
/index
