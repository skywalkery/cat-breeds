const hook = 'npm-run-all --parallel lint:js test type-check';

const isWindows = process.platform === 'win32';

module.exports = {
  hooks: {
    'pre-commit': isWindows ? hook : undefined,
    'pre-push': !isWindows ? hook : undefined,
  },
};
