#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const astroEntry = path.resolve('node_modules/astro/astro.js');

fs.rmSync(distDir, { recursive: true, force: true });

if (process.env.ASTRO_TELEMETRY_DISABLED === undefined) {
  process.env.ASTRO_TELEMETRY_DISABLED = '1';
}

const result = spawnSync(process.execPath, [astroEntry, 'build'], {
  stdio: 'inherit',
  env: process.env,
  shell: false,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

if (result.signal) {
  console.error(`Build interrupted by signal ${result.signal}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
