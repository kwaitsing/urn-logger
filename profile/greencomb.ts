import { getDateTimeString } from "./utils";
import chalk from "chalk";
import type { ProfileArgs } from ".";

export const greencomb = (c: ProfileArgs) => {
    const duration = (process.hrtime.bigint() - c.startTime) / 1000n

    const template = (code: number) => {
        const dateTime = chalk.bgGray(getDateTimeString(new Date()));
        const methodPath = code === 0 ? chalk.bgGreen(`${c.method}`) + ` ${c.path}` : chalk.bgRed(`${c.method}`) + ` ${c.path}`;
        return `${dateTime} ${methodPath} ${duration}μs`;
    }

    return {
        0: () => template(0),
        1: () => template(1)
    }
}