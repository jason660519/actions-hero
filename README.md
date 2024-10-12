
# GitHub Actions Tutorial: Create and Use a Custom Action

This tutorial guides you through setting up a simple custom GitHub Action using Node.js and integrating it with a GitHub workflow. Follow the steps below to create and test your own GitHub Action.

## 1. Install Node.js and npm
Ensure Node.js and npm are installed on your system. Download the latest version from the [Node.js official website](https://nodejs.org/).

Verify the installation with:
```bash
node -v
npm -v
```

## 2. Install VSCode and Recommended Extensions
Download and install [Visual Studio Code (VSCode)](https://code.visualstudio.com/). The following extensions are recommended for an improved development experience:
- **GitHub Actions**: Provides support for GitHub Actions.
- **GitLens**: Enhances Git capabilities.
- **Prettier - Code formatter**: Code formatting tool.

## 3. Initialize a Local Repository
1. Open VSCode and create a new folder (e.g., `C:\Users\a0922\OneDrive\Desktop\test`).
2. Initialize a new Git repository:
   ```bash
   git init
   ```

## 4. Create Directory Structure
In the root of your project, create the necessary folders and files:
```bash
mkdir -p .github/actions/my-custom-action
mkdir .github/workflows
```
The directory structure should look like:
```
test/
├── .github/
│   ├── actions/
│   │   └── my-custom-action/
│   └── workflows/
└── README.md
```

## 5. Create `action.yml` File
In the `.github/actions/my-custom-action` directory, create `action.yml` with the following content:
```yaml
# .github/actions/my-custom-action/action.yml
name: 'Example Action'
description: 'An example action that generates an output'
outputs:
  random-number:
    description: 'The generated random number'
runs:
  using: 'node12'
  pre: 'npm install'
  main: 'index.js'
```

## 6. Create `index.js` File
In the same directory, create `index.js` with this code:
```javascript
// .github/actions/my-custom-action/index.js
const core = require('@actions/core');

async function run() {
  try {
    const randomNumber = Math.floor(Math.random() * 100);
    core.setOutput('random-number', randomNumber.toString());
    console.log(`Generated random number: ${randomNumber}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
```

## 7. Initialize Project and Install Dependencies
Navigate to the `.github/actions/my-custom-action` directory and initialize an npm project:
```bash
cd .github/actions/my-custom-action
npm init -y
npm install @actions/core
```

## 8. Create Workflow File
In `.github/workflows`, create `example-workflow.yml` with this content:
```yaml
# .github/workflows/example-workflow.yml
name: Example Workflow

on: [push]

jobs:
  generate-and-use-output:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      
      - name: Run the custom action
        id: my_custom_action
        uses: ./.github/actions/my-custom-action
      
      - name: Use the output from the custom action
        run: |
          echo "The random number was: \${{ steps.my_custom_action.outputs.random-number }}"
```

## 9. Commit Changes
Navigate back to your project root and commit the changes:
```bash
cd C:\Users\a0922\OneDrive\Desktop\test
git add .
git commit -m "Add custom action and workflow"
```

## 10. Create a Remote GitHub Repository
1. Log in to GitHub.
2. Click the "+" icon and select "New repository".
3. Name your repository (e.g., `actions-hero`) and click "Create repository".

## 11. Link Remote Repository
Add the remote repository URL:
```bash
git remote add origin https://github.com/jason660519/actions-hero.git
```

## 12. Push Code to Remote Repository
Push the local `master` branch to the remote `main` branch:
```bash
git push -u origin master:main
```

## 13. Verify the Push
Visit `https://github.com/jason660519/actions-hero` to ensure the files have been pushed successfully.

## 14. Trigger the Workflow
After pushing, GitHub Actions will automatically trigger the `example-workflow`. Check the workflow execution in the "Actions" tab of your GitHub repository.

## Summary
You have now created a custom GitHub Action and set up a workflow to use it. If everything went smoothly, you should see the workflow run successfully and output the generated random number. If you encounter any issues, check the logs for more details and verify that all paths and filenames are correct.

Happy coding!


# GitHub Actions 教學：創建並使用自定義 Action

這份教學將指導你如何使用 Node.js 設置一個簡單的自定義 GitHub Action，並將其整合到 GitHub 的工作流程中。按照以下步驟創建並測試你的 GitHub Action。

## 1. 安裝 Node.js 和 npm

確保你的系統中已安裝 Node.js 和 npm。可以從 [Node.js 官方網站](https://nodejs.org/) 下載最新版本。

驗證安裝：

```bash
node -v
npm -v
```

## 2. 安裝 VSCode 和推薦擴展

下載並安裝 [Visual Studio Code (VSCode)](https://code.visualstudio.com/)。以下擴展推薦安裝以提高開發體驗：

- **GitHub Actions**：提供對 GitHub Actions 的支持。
- **GitLens**：增強 Git 功能。
- **Prettier - Code formatter**：代碼格式化工具。

## 3. 初始化本地倉庫

1. 打開 VSCode 並創建一個新文件夾（例如 `C:\Users\a0922\OneDrive\Desktop\test`）。
2. 初始化一個新的 Git 倉庫：
   ```bash
   git init
   ```

## 4. 創建目錄結構

在專案根目錄下創建所需的文件夾和文件：

```bash
mkdir -p .github/actions/my-custom-action
mkdir .github/workflows
```

目錄結構應該如下：

```
test/
├── .github/
│   ├── actions/
│   │   └── my-custom-action/
│   └── workflows/
└── README.md
```

## 5. 創建 `action.yml` 文件

在 `.github/actions/my-custom-action` 目錄下創建 `action.yml` 文件，並添加以下內容：

```yaml
# .github/actions/my-custom-action/action.yml
name: 'Example Action'
description: 'An example action that generates an output'
outputs:
  random-number:
    description: 'The generated random number'
runs:
  using: 'node12'
  pre: 'npm install'
  main: 'index.js'
```

## 6. 創建 `index.js` 文件

在同一目錄下創建 `index.js`，並添加以下代碼：

```javascript
// .github/actions/my-custom-action/index.js
const core = require('@actions/core');

async function run() {
  try {
    const randomNumber = Math.floor(Math.random() * 100);
    core.setOutput('random-number', randomNumber.toString());
    console.log(`Generated random number: ${randomNumber}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
```

## 7. 初始化專案並安裝依賴項

導航到 `.github/actions/my-custom-action` 目錄並初始化 npm 專案：

```bash
cd .github/actions/my-custom-action
npm init -y
npm install @actions/core
```

## 8. 創建工作流文件

在 `.github/workflows` 中創建 `example-workflow.yml`，並添加以下內容：

```yaml
# .github/workflows/example-workflow.yml
name: Example Workflow

on: [push]

jobs:
  generate-and-use-output:
    runs-on: ubuntu-latest
  
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
    
      - name: Run the custom action
        id: my_custom_action
        uses: ./.github/actions/my-custom-action
    
      - name: Use the output from the custom action
        run: |
          echo "The random number was: \${{ steps.my_custom_action.outputs.random-number }}"
```

## 9. 提交更改

導航回專案根目錄並提交更改：

```bash
cd C:\Users\a0922\OneDrive\Desktop\test
git add .
git commit -m "Add custom action and workflow"
```

## 10. 創建遠端 GitHub 倉庫

1. 登錄到 GitHub。
2. 點擊右上角的 "+" 號，選擇 "New repository"。
3. 填寫倉庫名稱（例如 `actions-hero`），然後點擊 "Create repository"。

## 11. 連結遠端倉庫

添加遠端倉庫 URL：

```bash
git remote add origin https://github.com/jason660519/actions-hero.git
```

## 12. 推送代碼到遠端倉庫

將本地 `master` 分支推送到遠端的 `main` 分支：

```bash
git push -u origin master:main
```

## 13. 驗證推送

訪問 `https://github.com/jason660519/actions-hero` 確認文件是否已成功推送。

## 14. 觸發工作流

推送更改後，GitHub Actions 會自動觸發 `example-workflow`。你可以在 GitHub 倉庫的 "Actions" 標籤頁下查看工作流的執行情況。

## 總結

通過以上步驟，你已經創建了一個自定義的 GitHub Action 並設置了一個使用該自定義動作的工作流。如果一切順利，你應該能夠看到工作流成功運行，並看到生成的隨機數。如果有任何問題，請查看日誌以獲取更多詳細信息，並確保所有路徑和文件名都是正確的。

祝你編程愉快！
