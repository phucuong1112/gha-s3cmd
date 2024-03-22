const core = require('@actions/core');
const homedir = require('os').homedir();
const path = require('path');
const fs = require('fs');

const cleanup_config = core.getInput("cleanup_config") || "false";
core.info(`* Clean up file ${cleanup_config}`);
if (['1', "true", "yes"].indexOf(cleanup_config.toLowerCase()) >= 0) {
  let config_path = core.getInput("config_path") || path.join(homedir, '.s3cfg');
  fs.rmSync(config_path);
  core.info(`- ${cleanup_config} is deleted`);
}

return 0