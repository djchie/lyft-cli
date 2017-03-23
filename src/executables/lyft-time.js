#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

let addressArg;

program
  .arguments('<address>')
  .action((address) => {
    addressArg = address;
  })
  .parse(process.argv);

if (addressArg === undefined) {
  console.error('Please provide an address!');
  process.exit(1);
}

try {
  service.executeDriverEtas(addressArg)
    .then(table => console.log(table));
} catch (error) {
  console.error('Could not get estimated arrival times');
}
