import { program } from 'commander';
import { startCommand } from './commands/serve';

program.addCommand(startCommand);

program.parse(process.argv);
