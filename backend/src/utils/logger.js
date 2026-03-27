import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, '../../logs');

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logLevel = process.env.LOG_LEVEL || 'info';

const logger = {
  error: (message) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    writeLog('error.log', message);
  },
  warn: (message) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  },
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  },
  debug: (message) => {
    if (logLevel === 'debug') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  },
};

const writeLog = (filename, message) => {
  const filePath = path.join(logDir, filename);
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(filePath, logMessage);
};

export default logger;
