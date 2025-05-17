//write a fucntion which add logs to log file like this - logger.log('message') - this will be used in all the files
import fs from 'fs';
import path from 'path';

class Logger {
  private logFilePath: string;

  constructor(logFileName = 'realTimeTrade.log') {
    const logDir = path.resolve(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    this.logFilePath = path.join(logDir, logFileName);
  }

  log(message: string) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(this.logFilePath, formattedMessage, { encoding: 'utf8' });
    console.log(formattedMessage.trim());
  }
}
const logger = new Logger();
export default logger;
