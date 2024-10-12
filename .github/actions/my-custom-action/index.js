// .github/actions/my-custom-action/index.js
const core = require('@actions/core');

async function run() {
  try {
    // 生成一个随机数
    const randomNumber = Math.floor(Math.random() * 100);
    
    // 设置输出
    core.setOutput('random-number', randomNumber.toString());
    
    console.log(`Generated random number: ${randomNumber}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();