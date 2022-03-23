/* eslint-disable no-console */
// eslint-disable-next-line
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
// eslint-disable-next-line
const chalk = require('chalk');
const packageJSON = require('../package.json');
const config = require('../webpack/webpack.config.dll.js');

const vendorHash = crypto.createHash('md5')
  .update(JSON.stringify(packageJSON.dependencies))
  .digest('hex')
  .substr(0, 8);

let oldHash = null;
try {
  oldHash = fs.readFileSync(path.join(__dirname, '../dll', 'hash'), 'utf8');
} catch (e) {
  // ignore
}

if (vendorHash !== oldHash) {
  console.log(chalk.yellow('New dependencies hash. Build dll...'));
  webpack(config, (err, stats) => {
    if (err) {
      console.error(chalk.red(err.stack || err));
      if (err.details) {
        console.error(err.details);
      }
      throw new Error('webpack error');
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(chalk.red(info.errors));
      throw new Error('webpack error');
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    fs.writeFileSync(path.join(__dirname, '../dll', 'hash'), vendorHash);
  });
}
