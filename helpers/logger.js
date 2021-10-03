import { envConfig } from "../configs";
import { LOG_LEVELS, ENVIRONMENTS } from "../constants";
import pino from "pino";
import pinoExpress from "express-pino-logger";

export class Logger {
  constructor() {
    this.level = envConfig.ENV === ENVIRONMENTS.DEVELOPMENT ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;
  }

  serverLogger() {
    pino(
      {
        name: "server",
        level: this.level,
        formatters: {
          level(label) {
            return { level: label };
          }
        }
      },
      pino.destination(`./logs/server-${envConfig.ENV}`)
    );
  }

  expressLogger() {
    pinoExpress(
      {
        name: "express",
        level: this.level,
        formatters: {
          level(label) {
            return { level: label };
          }
        }
      },
      pino.destination(`./logs/express-${envConfig.ENV}`)
    );
  }
}

export const logger = new Logger();
