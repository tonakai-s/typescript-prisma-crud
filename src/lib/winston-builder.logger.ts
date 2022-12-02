import { Logger } from "winston";
import { buildDevLogger } from "./winston-dev.logger";
import { buildProdLogger } from "./winston-prod.logger";

let logger: Logger;

if(process.env.NODE_ENV === 'development'){
    logger = buildDevLogger();
} else {
    logger = buildProdLogger();
}

export default logger;