#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .arguments('<address>')
  .action((address) => {
    try {
        service.executeNearbyDrivers(address)
          .then(table => console.log(table));
    } catch (error) {
      console.error('Could not get nearby drivers');
    }
  })
  .parse(process.argv);
