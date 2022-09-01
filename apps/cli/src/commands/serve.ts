import path from 'path';
import { Command } from 'commander';
import { startServer } from '@carnet/local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const startCommand = new Command()
  .command('start [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4127')
  .
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await startServer(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port.');
      } else {
        console.log('Heres the problem', err.message);
      }
      process.exit(1);
    }
  });
