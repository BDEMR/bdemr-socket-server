
## setup

```
sudo -i
```

```
apt update
apt install nodejs
apt install npm

git config --global credential.helper "cache --timeout=9999999999999999"
git clone https://github.com/BDEMR/bdemr-socket-server.git --branch master
  bdemr-bot
  YCaNjXb8IokUg4cCD4TmieTfXM1hdrPK
cd /bdemr-server/server/src
npm install

npm install pm2 -g
pm2 start index.js --name "bdemr-socket-server" -x -- --ssl --mode production
pm2 startup systemd
pm2 save

```

