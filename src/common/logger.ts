import fs from 'fs';
import path from 'path';

const dir = path.join(__dirname, '../../logs');
const logFile = path.join(__dirname, '../../logs/logs.txt');
const errorFile = path.join(__dirname, '../../logs/errors.txt');

function loggingLog<T extends string>(data: T): void {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.appendFileSync(logFile, data);
      fs.appendFileSync(logFile, '\n');
    } catch (error) {
      console.error(error);
    }
  } else {
    fs.appendFileSync(logFile, data);
    fs.appendFileSync(logFile, '\n');
  }
}

function loggingError<T extends string>(data: T): void {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.appendFileSync(errorFile, data);
      fs.appendFileSync(errorFile, '\n');
    } catch (error) {
      console.error(error);
    }
  } else {
    fs.appendFileSync(errorFile, data);
    fs.appendFileSync(errorFile, '\n');
  }
}

export { loggingLog, loggingError };
