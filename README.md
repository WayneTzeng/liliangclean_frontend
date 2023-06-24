# Cosmos Stamp

立亮居家家飾清潔

## Tech Stack

- [Vue3](https://v3.vuejs.org/)
- [Yarn](https://classic.yarnpkg.com/zh-Hant/)

## Documents

- UI 設計圖: [Figma](https://drive.google.com/file/d/1bQfM71ctj7wxDc_0w7zkkZDEr521942z/view?usp=sharing)
- [API 文件]()

## Installation

安裝 [Yarn](https://classic.yarnpkg.com/zh-Hant/)

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

安裝 [Serve](https://github.com/vercel/serve)

```bash
yarn global add serve
```

## Build Setup

```bash
# 安裝套件
$ yarn

# 啟動開發用伺服器
$ yarn start #(NODE_ENV: development, for maintenance, connect uat api path)
$ yarn start-mock #(NODE_ENV: mock)
$ yarn start-sit #(NODE_ENV: sit)
$ yarn start-uat #(NODE_ENV: uat)
$ yarn start-prd #(NODE_ENV: production)


# 正式環境
$ yarn build # 將專案打包正式環境的靜態檔案
$ yarn serve # 啟動伺服器 (NODE_ENV: production)

# or
$ yarn restart # 快速重新包版並啟動伺服器
```

## Environments

- development: for local development (with debugging)
- mock: for mock data (with debugging)
- sit: for development testing (with debugging)
- uat: for uat (with debugging)
- production: for production

### Building by Different Environment

```bash
$ yarn build --mode <mode name>

# example
$ yarn build --mode uatDebug
```

## Workflow

- 開發流程採 [Git Flow](https://gitbook.tw/chapters/gitflow/why-need-git-flow.html)
- 正式環境主分支為 `master`
- 開發環境主分支為 `develop`
- UAT 測試環境分支為 `release-uat`
- 欲開發新功能時，請一律以 `develop` 分支為基準，另開一個新的分支，並依照下列規則命名分支：
  1. `feature`: 開發新功能, ex: `feature-add_dialog`
  2. `bugfix`: 修復尚未發佈上線的錯誤, ex: `bugfix-homepage_css`
  3. `hotfix`: 修復線上版本的錯誤, ex: `hotfix-member_login_failure`
  4. `release`: 發佈一個新版本, ex: `release-uat` or `release-1.3.5`

範例：
如欲開發一個首頁頁面，請參照下列指令建立一個 feature 分支。

```bash
git checkout develop
git checkout -b feature-add_dialog
```

- Commit message 請依照 [約定式提交](https://www.conventionalcommits.org/zh-hant/v1.0.0-beta.4/#%e8%a6%8f%e7%af%84)

- 可使用的 Commit message 類型如下，包括但不限於：

  1. `feat`: 新增, 修改功能(或套件)，對應到 `feature/*` 分支
  2. `fix`: 修復錯誤，對應到 `bugfix/*` 及 `hotfix/*` 分支
  3. `chore`: 不影響功能面的事項，如修改 eslint 設定、修改 coding style、修改 README 等等
  4. `refactor`: 不是新增功能，也不是修復錯誤的改動 (重寫某個 function)

- Commit message 範例如下：

```bash
git commit -m "feat: add a new dialog component"
git commit -m "fix: color issue of shops bar in the homepage"
git commit -m "chore: add semi requirement of prettier"
git commit -m "refactor: rewrite get user function for better reading"
```

## Coding style

- Linter: [ESLint](https://eslint.org/docs/rules/)
- Formatter: [Prettier](https://prettier.io/)
- 預設存檔時自動進行 linting 及 formatting (設定於 `.vscode/settings.json`)

```bash
#.vscode/settings.json

{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file"
}
```
