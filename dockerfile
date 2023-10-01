# 使用官方 Node.js image 作為基礎 image
FROM node:18
# 設置工作目錄
WORKDIR /app

# 安裝 Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# 複製 package.json 和 yarn.lock 到工作目錄
COPY package.json yarn.lock ./


# 安裝專案依賴
RUN yarn install

# 全局安裝 serve
RUN yarn global add serve

# 確保容器內可以找到全局套件
ENV PATH="$PATH:/root/.yarn/bin"

# 複製專案的其他檔案
COPY . .

# 啟動
CMD cd /app && yarn serve 


