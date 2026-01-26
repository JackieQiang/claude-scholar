#!/usr/bin/env node
/**
 * 跨平台 Hook 启动器
 * 无需任何路径参数，自动定位并执行指定的 hook 脚本
 *
 * 使用方式：node ~/.claude/hooks/node/run-hook.js <hook-name>
 * 或者在任何目录：node <path-to-run-hook.js> <hook-name>
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

// 获取 hook 名称
const hookName = process.argv[2];
if (!hookName) {
  console.error('Usage: node run-hook.js <hook-name>');
  process.exit(1);
}

// 自动定位 hooks 目录
// 1. 尝试当前目录的 node/
// 2. 尝试相对于此文件的目录
let hooksDir = __dirname;

// 检查是否在正确的位置
const testFile = path.join(hooksDir, 'hook-common.js');
if (!fs.existsSync(testFile)) {
  // 尝试使用 os.homedir()
  hooksDir = path.join(os.homedir(), '.claude', 'hooks', 'node');
}

// 构建 hook 路径
const hookPath = path.join(hooksDir, `${hookName}.js`);

// 检查文件是否存在
if (!fs.existsSync(hookPath)) {
  // Hook 不存在，静默退出
  process.exit(0);
}

// 执行 hook，传递 stdin
try {
  const input = fs.readFileSync(0, 'utf8');
  const result = execSync(`node "${hookPath}"`, {
    input,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe']
  });
  console.log(result);
} catch (err) {
  // Hook 执行失败，静默退出
  process.exit(0);
}

process.exit(0);
