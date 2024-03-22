const core = require('@actions/core');
const homedir = require('os').homedir();
const path = require('path');
const { execSync } = require('child_process');
const { createWriteStream } = require('fs')
const { providers, makeConf } = require('./providers');
const fs = require('fs');

function run() {
  // Main
  execSync(`/bin/bash -c '[ -z "$(which s3cmd)" ] && pip3 install s3cmd --no-cache || echo "s3cmd is installed"'`);

  const conf = makeConf(providers[core.getInput('provider')]({
    region: core.getInput("region"),
    account_id: core.getInput("account_id"),
    access_key: core.getInput("access_key"),
    secret_key: core.getInput("secret_key"),
  }))
  
  let config_path = core.getInput("config_path") || path.join(homedir, '.s3cfg');
  const writer = createWriteStream(config_path)
  
  for (const line of conf) {
    writer.write(line + '\r\n')
  }
}

function cleanup() {
  const cleanup_config = core.getInput("cleanup_config") || "false";
  if (['1', "true", "yes"].indexOf(cleanup_config.toLowerCase()) >= 0) {
    let config_path = core.getInput("config_path") || path.join(homedir, '.s3cfg');
    fs.rmSync(config_path);
  }
}

module.exports = {
  run,
  cleanup
}