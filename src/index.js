const core = require('@actions/core');
const homedir = require('os').homedir();
const path = require('path');
const { execSync } = require('child_process');
const { createWriteStream } = require('fs')
const { providers, makeConf } = require('./providers')

const isPost = !!core.getState('isPost');
if (!isPost) {
  // Main
  execSync("/bin/bash -c 'pip3 install s3cmd --no-cache'");

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
} else {
  // Post
  const cleanup_config = core.getInput("cleanup_config") || "false";
  if (['1', "true", "yes"].indexOf(cleanup_config.toLowerCase()) >= 0) {
    let config_path = core.getInput("config_path") || path.join(homedir, '.s3cfg');
    fs.unlink(config_path);
  }
}

return 0
