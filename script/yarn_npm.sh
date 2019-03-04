#install npm
apt-get -y install curl software-properties-common
curl -sL https://deb.nodesource.com/setup_11.x | sudo bash -
apt-get -y install nodejs

#install yarn 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt -y update
sudo apt -y install yarn
