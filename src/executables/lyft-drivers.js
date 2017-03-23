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

try {
  service.executeNearbyDrivers(addressArg)
    .then(table => console.log(table));
} catch (error) {
  console.error('Could not get nearby drivers');
}
