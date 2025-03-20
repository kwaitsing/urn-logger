import { getDateTimeString } from "./utils";
import chalk from "chalk";
import type { ProfileArgs } from ".";

export const greencomb = (c: ProfileArgs) => {
    const duration = (process.hrtime.bigint() - c.startTime) / 1000n

    const template = (code: number) => {
        const dateTime = chalk.bgGray(getDateTimeString(new Date()));
        const method = code === 0 ? chalk.bgGreen(`${c.method}`) : chalk.bgRed(`${c.method}`);
        if (c.isDebug) {
            const debugTag = chalk.bgYellow('DEBUG')
            return `${debugTag} ${dateTime} ${method} ${c.path} ${duration}μs | ${c.errMsg}`
        } else {
            return `${dateTime} ${method} ${c.path} ${duration}μs`
        }
    }

    return {
        0: () => template(0),
        1: () => template(1)
    }
}