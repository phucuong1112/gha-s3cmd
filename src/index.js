const core = require('@actions/core');
const { run, cleanup } = require('./actions');

const isPost = !!core.getState('isPost');
if (!isPost) {
  run();
} else {
  cleanup();
}

return 0
