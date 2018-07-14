id=$1
echo $id > info.txt
mkdir /project
touch /project/index.js
pm2 start /kide/server.js --name kide
cd /project
python ../kide/terminal/unique.py
