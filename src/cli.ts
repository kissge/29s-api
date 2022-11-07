import yargs from 'yargs';
import { create29sAPIServer } from './';

const { argv } = yargs.options({
  port: { type: 'number', alias: 'p', default: 2929 },
  root: { type: 'string', alias: 'r', default: '.' },
});

create29sAPIServer(argv.root, argv.port);
console.log(`Serving ${argv.root} at port ${argv.port}`);
