apt-get update -qq \ && apt-get install -y --no-install-recommends build-essential \ apt-transport-https curl ca-certificates gnupg2 apt-utils nodejs 
# Install node from nodesource  
curl -sL https://deb.nodesource.com/setup_10.x | bash - \ && apt-get install -y nodejs 
# Install yarn 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \ && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \ && apt-get update -qq \ && apt-get install -y yarn 
# Test RUN 
yarn --version
