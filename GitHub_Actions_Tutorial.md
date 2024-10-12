
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
