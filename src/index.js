const core = require('@actions/core');
const homedir = require('os').homedir();
const path = require('path');
const { execSync } = require('child_process');
const { createWriteStream } = require('fs')
const { providers, makeConf } = require('./providers');
const fs = require('fs');

execSync(`/bin/bash -c '[ -z "$(which s3cmd)" ] && pip3 install s3cmd --no-cache || echo "s3cmd is installed"'`);

const conf = makeConf(providers[core.getInput('provider')]({
  region: core.getInput("region"),
  account_id: core.getInput("account_id"),
  access_key: core.getInput("access_key"),
  secret_key: core.getInput("secret_key"),
}))

let config_path = core.getInput("config_path") || path.join(homedir, '.s3cfg');
core.info(`* Setup file ${config_path}`);
const writer = createWriteStream(config_path)

for (const line of conf) {
  writer.write(line + '\r\n')
}

return 0