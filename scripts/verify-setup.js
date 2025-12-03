#!/usr/bin/env node

/**
 * Setup verification script for Haunted Refactorium
 * Checks if all required dependencies and services are available
 */

import fs from 'fs';
import { execSync } from 'child_process';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCommand(command, name) {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' });
    log(`✓ ${name} is installed`, 'green');
    return true;
  } catch {
    log(`✗ ${name} is not installed`, 'red');
    return false;
  }
}

function checkFile(filePath, name) {
  if (fs.existsSync(filePath)) {
    log(`✓ ${name} exists`, 'green');
    return true;
  } else {
    log(`✗ ${name} not found`, 'red');
    return false;
  }
}

function checkPort(port) {
  try {
    const command =
      process.platform === 'win32' ? `netstat -ano | findstr :${port}` : `lsof -i :${port}`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  log('\n🎃 Haunted Refactorium Setup Verification\n', 'blue');

  let allGood = true;

  // Check Node.js version
  log('Checking Node.js version...', 'yellow');
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion >= 18) {
    log(`✓ Node.js ${nodeVersion} (>= 18 required)`, 'green');
  } else {
    log(`✗ Node.js ${nodeVersion} (>= 18 required)`, 'red');
    allGood = false;
  }

  // Check npm
  log('\nChecking package managers...', 'yellow');
  checkCommand('npm', 'npm');

  // Check Docker (optional)
  log('\nChecking Docker (optional for local deployment)...', 'yellow');
  const hasDocker = checkCommand('docker', 'Docker');
  if (hasDocker) {
    checkCommand('docker-compose', 'Docker Compose');
  }

  // Check required files
  log('\nChecking project files...', 'yellow');
  checkFile('package.json', 'package.json');
  checkFile('.env.example', '.env.example');
  checkFile('tsconfig.json', 'tsconfig.json');
  checkFile('vite.config.ts', 'vite.config.ts');

  // Check if .env exists
  if (!checkFile('.env', '.env')) {
    log('  → Run: cp .env.example .env', 'yellow');
  }

  // Check if node_modules exists
  log('\nChecking dependencies...', 'yellow');
  if (!checkFile('node_modules', 'node_modules')) {
    log('  → Run: npm install', 'yellow');
    allGood = false;
  } else {
    log('✓ Dependencies installed', 'green');
  }

  // Check ports
  log('\nChecking ports...', 'yellow');
  if (checkPort(3000)) {
    log('⚠ Port 3000 is in use (frontend)', 'yellow');
  } else {
    log('✓ Port 3000 is available', 'green');
  }

  if (checkPort(3001)) {
    log('⚠ Port 3001 is in use (backend)', 'yellow');
  } else {
    log('✓ Port 3001 is available', 'green');
  }

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  if (allGood) {
    log("✓ Setup verification complete! You're ready to go.", 'green');
    log('\nNext steps:', 'blue');
    log('  1. npm run dev:backend  (in terminal 1)', 'reset');
    log('  2. npm run dev:frontend (in terminal 2)', 'reset');
    log('  3. Visit http://localhost:3000', 'reset');
  } else {
    log('⚠ Some issues found. Please fix them before starting.', 'yellow');
  }
  log('='.repeat(50) + '\n', 'blue');
}

main().catch(console.error);
