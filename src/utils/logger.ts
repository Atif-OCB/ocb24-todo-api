import { createLogger, format, transports } from 'winston';

const customFormatter = (info: any) => {
  const { userId, level, message, timestamp } = info;
  const formattedMessage = userId ? `[${userId}] ${message}` : message;
  return `${timestamp} [${level}]: ${formattedMessage}`;
};

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(customFormatter),
    format.colorize({
      all: true,
      colors: {
        info: 'green',
        error: 'red',
        warn: 'yellow',
      }
    }),
  ),
  transports: [new transports.Console()],
});

export default logger;