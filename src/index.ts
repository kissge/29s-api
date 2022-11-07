import assert from 'assert';
import fs from 'fs';
import express from 'express';
import { v2 as webdav } from 'webdav-server';

/**
 * Create a 29s-api instance.
 * @param rootPath Path to directory, on the physical file system. Defaults to `.`.
 * @param port Port number to listen. Defaults to `2929`.
 * @returns A 29s-api instance
 */
export function create29sAPIServer(rootPath: string = '.', port: number = 2929, httpPath: string = '/') {
  const server = new webdav.WebDAVServer();

  server.setFileSystem('/', new webdav.PhysicalFileSystem(rootPath), assert);

  const expressServer = express();
  const handler = webdav.extensions.express(httpPath, server);
  expressServer.use((req, res, next) => {
    if (fs.existsSync(rootPath + req.path) || fs.existsSync(rootPath + req.path.replace(/\/[^\/]+\/*$/, ''))) {
      handler(req, res, next);
    } else {
      next();
    }
  });
  expressServer.listen(port);

  return expressServer;
}
