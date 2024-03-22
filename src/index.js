const core = require('@actions/core');
const { run, cleanup } = require('./actions');

const isPost = (process.argv.length == 3 &&process.argv[2] == 'post') ? true : false;
if (isPost) {
  cleanup();
}
else {
  run();
}

return 0