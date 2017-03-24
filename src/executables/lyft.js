#!/usr/bin/env node
import program from 'commander';

import pkg from '../../package.json';

program.version(pkg.version)
  .command('types', 'get ride types')
  .command('time', 'get estimated arrival times')
  .command('price', 'get estimated prices')
  .command('drivers', 'get nearby drivers')
  .parse(process.argv);
