import type { HTTPMethod } from "elysia";
import { getDateTimeString, hrTimeToDate } from "./utils";
import chalk from "chalk";
import type { ProfileArgs } from ".";

export const greencomb = (c: ProfileArgs) => {
    const duration = (process.hrtime.bigint() - c.startTime) / 1000n
    const success = () => {

        const dateTime = chalk.gray(getDateTimeString(new Date()));
        const methodPath = chalk.cyan(`${c.method} ${c.path}`);
        
        return `${dateTime} ${methodPath} ${duration}μs`;
    }

    const error = () => {
        const dateTime = getDateTimeString(new Date());
        return chalk.red(`${dateTime} ${c.method} ${c.path}`);
    }

    return {
        0: success,
        1: error
    }
}