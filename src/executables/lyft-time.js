#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .arguments('<address>')
  .action((address) => {
    try {
        service.executeDriverEtas(address)
          .then(table => console.log(table));
    } catch (error) {
      console.error('Could not get estimated arrival times');
    }
  })
  .parse(process.argv);
