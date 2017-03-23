#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .option('-s, --start <start>', 'specify start address')
  .option('-e, --end <end>', 'specify end address')
  .parse(process.argv);

// if (program.start === undefined) {
//   console.error('Please provide a start address!');
//   process.exit(1);
// }

if (program.end === undefined) {
  console.error('Please provide a destination address!');
  process.exit(1);
}

try {
  service.executeRideEstimates(program.start, program.end)
    .then(table => console.log(table));
} catch (error) {
  console.error('Could not get estimated prices');
}