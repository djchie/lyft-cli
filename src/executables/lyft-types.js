#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .arguments('<address>')
  .action((address) => {
    try {
        service.executeRideTypes(address)
          .then(table => console.log(table));
    } catch (error) {
      console.error('Could not get ride types');
    }
  })
  .parse(process.argv);
