import { existsSync, mkdirSync, appendFileSync } from 'fs';
import { join } from 'path';

const dir = join(__dirname, '../../logs');
const logFile = join(__dirname, '../../logs/logs.txt');
const errorFile = join(__dirname, '../../logs/errors.txt');

function loggingLog<T extends string>(data: T): void {
  if (!existsSync(dir)) {
    try {
      mkdirSync(dir, { recursive: true });
      appendFileSync(logFile, data);
      appendFileSync(logFile, '\n');
    } catch (error) {
      console.error(error);
    }
  } else {
    appendFileSync(logFile, data);
    appendFileSync(logFile, '\n');
  }
}

function loggingError<T extends string>(data: T): void {
  if (!existsSync(dir)) {
    try {
      mkdirSync(dir, { recursive: true });
      appendFileSync(errorFile, data);
      appendFileSync(errorFile, '\n');
    } catch (error) {
      console.error(error);
    }
  } else {
    appendFileSync(errorFile, data);
    appendFileSync(errorFile, '\n');
  }
}

export { loggingLog, loggingError };
