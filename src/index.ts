import assert from 'assert';
import { v2 as webdav } from 'webdav-server';
import yargs from 'yargs';

const { argv } = yargs.options({
  port: { type: 'number', alias: 'p', default: 2929 },
  root: { type: 'string', alias: 'r', default: '.' },
});

const server = new webdav.WebDAVServer({ port: argv.port });

server.setFileSystem('/', new webdav.PhysicalFileSystem(argv.root), assert);

server.start(server => {
  assert(server);
  console.log(`Serving ${argv.root} at port ${argv.port}`);
});
