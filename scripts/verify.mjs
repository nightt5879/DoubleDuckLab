#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const npmExecPath = process.env.npm_execpath;
const steps = [
  'validate:content',
  'build',
  'test:smoke',
  'test:seo',
];

if (!npmExecPath) {
  console.error('[verify] npm_execpath is not set. Run this script via `npm run verify`.');
  process.exit(1);
}

steps.forEach((scriptName, index) => {
  console.log(`[verify] step ${index + 1}/${steps.length}: npm run ${scriptName}`);

  const result = spawnSync(process.execPath, [npmExecPath, 'run', scriptName], {
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });

  if (result.error) {
    console.error(`[verify] failed to start npm run ${scriptName}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.signal) {
    console.error(`[verify] interrupted during npm run ${scriptName}: ${result.signal}`);
    process.exit(1);
  }

  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
});
