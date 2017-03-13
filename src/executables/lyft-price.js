#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .option('-s, --start <start>', 'specify start address')
  .option('-e, --end <end>', 'specify end address')
  .parse(process.argv);

try {
  service.executeRideEstimates(program.start, program.end, program.unit)
    .then(table => console.log(table));
} catch (error) {
  console.error('Could not get estimated prices');
}