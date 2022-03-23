/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const fs = require('fs');
const archiver = require('archiver');
const chalk = require('chalk');

const output = fs.createWriteStream('dist.zip');
const archive = archiver('zip');

output.on('close', () => {
  console.log(chalk.green(`${archive.pointer()} total bytes`));
  console.log(chalk.green('Dist archive was successfully created'));
});

archive.on('error', (err) => { throw err; });

archive.pipe(output);
archive.directory('dist/');
archive.file('package.json');
archive.file('package-lock.json');
archive.file('ecosystem.config.js');
archive.finalize();
